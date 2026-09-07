import { getEditorSession } from "../../../../lib/editor-session";
import { getFileContent, commitChanges } from "../../../../lib/github-commit";

const DATA_PATH = "data/music-releases.json";

type Release = {
  slug: string;
  title: string;
  year: string;
  credit?: string;
  cover: string;
  links?: Record<string, string>;
  tracks?: { title: string; note?: string; audioUrl: string }[];
};

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
  if (body.links && typeof body.links === "object" && release.links) {
    for (const [service, url] of Object.entries(body.links)) {
      if (typeof url === "string" && service in release.links) release.links[service] = url;
    }
  }

  await commitChanges(
    { writes: [{ path: DATA_PATH, content: JSON.stringify(releases, null, 2) + "\n" }] },
    `Editor: update "${release.title}" release`,
  );

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
