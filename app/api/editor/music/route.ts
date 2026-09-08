import { getEditorSession } from "../../../../lib/editor-session";
import { getFileContent, commitChanges, type CommitWrite } from "../../../../lib/github-commit";
import { resizeCoverImage } from "../../../../lib/image-resize";
import { del } from "@vercel/blob";

const DATA_PATH = "data/music-releases.json";
const SERVICES = ["spotify", "apple", "youtube", "pandora", "soundcloud"] as const;

type Release = {
  slug: string;
  title: string;
  year: string;
  credit?: string;
  cover: string;
  links?: Record<string, string>;
  tracks?: { title: string; note?: string; audioUrl?: string }[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function linksFromBody(body: Record<string, unknown>): Record<string, string> {
  const links: Record<string, string> = {};
  for (const service of SERVICES) {
    const value = body[service];
    links[service] = typeof value === "string" ? value.trim() : "";
  }
  return links;
}

async function fetchAndResizeCover(blobUrl: string): Promise<Buffer> {
  // The blob store is private, so a plain fetch would 403.
  const response = await fetch(blobUrl, { headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` } });
  if (!response.ok) throw new Error(`Failed to fetch uploaded image: ${response.status}`);
  const arrayBuffer = await response.arrayBuffer();
  return resizeCoverImage(Buffer.from(arrayBuffer));
}

export async function POST(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const year = typeof body?.year === "string" ? body.year.trim() : "";
  const credit = typeof body?.credit === "string" ? body.credit.trim() : "";
  const coverBlobUrl = typeof body?.coverBlobUrl === "string" ? body.coverBlobUrl : "";
  if (!title) return Response.json({ error: "Title is required." }, { status: 400 });
  if (!coverBlobUrl) return Response.json({ error: "Cover image is required." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Music releases file not found." }, { status: 500 });
  const releases: Release[] = JSON.parse(raw);

  const baseSlug = slugify(title) || "release";
  let slug = baseSlug;
  let suffix = 2;
  while (releases.some((item) => item.slug === slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  let coverBuffer: Buffer;
  try {
    coverBuffer = await fetchAndResizeCover(coverBlobUrl);
  } catch {
    return Response.json({ error: "Could not process the uploaded cover image." }, { status: 400 });
  }

  const coverPath = `public/images/music/${slug}.jpg`;
  const release: Release = { slug, title, year, credit, cover: `/images/music/${slug}.jpg`, links: linksFromBody(body) };
  releases.push(release);

  await commitChanges(
    {
      writes: [
        { path: DATA_PATH, content: JSON.stringify(releases, null, 2) + "\n" },
        { path: coverPath, content: coverBuffer.toString("base64"), encoding: "base64" },
      ],
    },
    `Editor: add release "${title}"`,
  );

  await del(coverBlobUrl).catch(() => {});

  return Response.json({ ok: true, release });
}

export async function PATCH(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : "";
  if (!slug) return Response.json({ error: "Missing slug." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Music releases file not found." }, { status: 500 });
  const releases: Release[] = JSON.parse(raw);
  const release = releases.find((item) => item.slug === slug);
  if (!release) return Response.json({ error: "Release not found." }, { status: 404 });

  if (typeof body.title === "string") release.title = body.title;
  if (typeof body.year === "string") release.year = body.year;
  if (typeof body.credit === "string") release.credit = body.credit;
  if (body.links && typeof body.links === "object") {
    const incoming = body.links as Record<string, unknown>;
    // Tracks-based releases (dog gods: singles) have no links concept at all
    // and the editor never shows link fields for them, but it still sends an
    // empty {} in the save request -- only create/touch release.links if
    // there's a real value to write, or it already exists. Otherwise this
    // stamps an empty {} onto a release, which fails Release's Record<...,
    // string> type (every service key required) at the next build.
    const hasRealValue = SERVICES.some((service) => typeof incoming[service] === "string");
    if (release.links || hasRealValue) {
      if (!release.links) release.links = {};
      for (const service of SERVICES) {
        const url = incoming[service];
        if (typeof url === "string") release.links[service] = url;
      }
    }
  }

  const coverBlobUrl = typeof body.coverBlobUrl === "string" ? body.coverBlobUrl : "";
  const writes: CommitWrite[] = [];
  if (coverBlobUrl) {
    let coverBuffer: Buffer;
    try {
      coverBuffer = await fetchAndResizeCover(coverBlobUrl);
    } catch {
      return Response.json({ error: "Could not process the uploaded cover image." }, { status: 400 });
    }
    release.cover = `/images/music/${slug}.jpg`;
    writes.push({ path: `public/images/music/${slug}.jpg`, content: coverBuffer.toString("base64"), encoding: "base64" });
  }
  writes.push({ path: DATA_PATH, content: JSON.stringify(releases, null, 2) + "\n" });

  await commitChanges({ writes }, `Editor: update "${release.title}" release`);

  if (coverBlobUrl) await del(coverBlobUrl).catch(() => {});

  return Response.json({ ok: true, release });
}

export async function DELETE(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : "";
  if (!slug) return Response.json({ error: "Missing slug." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Music releases file not found." }, { status: 500 });
  const releases: Release[] = JSON.parse(raw);
  const removed = releases.find((item) => item.slug === slug);
  const remaining = releases.filter((item) => item.slug !== slug);
  if (remaining.length === releases.length) return Response.json({ error: "Release not found." }, { status: 404 });

  await commitChanges(
    {
      writes: [{ path: DATA_PATH, content: JSON.stringify(remaining, null, 2) + "\n" }],
      deletes: removed?.cover ? [removed.cover.replace(/^\//, "public/")] : [],
    },
    `Editor: delete release "${slug}"`,
  );

  return Response.json({ ok: true });
}
