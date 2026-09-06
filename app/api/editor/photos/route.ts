import { getEditorSession } from "../../../../lib/editor-session";
import { getFileContent, commitChanges } from "../../../../lib/github-commit";

const DATA_PATH = "data/photo-collections.json";

type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  photos: string[];
};

export async function PATCH(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : "";
  if (!slug) return Response.json({ error: "Missing slug." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Collections file not found." }, { status: 500 });
  const collections: Collection[] = JSON.parse(raw);
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) return Response.json({ error: "Collection not found." }, { status: 404 });

  if (typeof body.title === "string") collection.title = body.title;
  if (typeof body.subtitle === "string") collection.subtitle = body.subtitle;

  await commitChanges(
    { writes: [{ path: DATA_PATH, content: JSON.stringify(collections, null, 2) + "\n" }] },
    `Editor: update "${collection.title}" photo collection`,
  );

  return Response.json({ ok: true, collection });
}

export async function DELETE(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : "";
  if (!slug) return Response.json({ error: "Missing slug." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Collections file not found." }, { status: 500 });
  const collections: Collection[] = JSON.parse(raw);
  const remaining = collections.filter((item) => item.slug !== slug);
  if (remaining.length === collections.length) {
    return Response.json({ error: "Collection not found." }, { status: 404 });
  }

  await commitChanges(
    {
      writes: [{ path: DATA_PATH, content: JSON.stringify(remaining, null, 2) + "\n" }],
      deletes: [`public/gallery/${slug}`],
    },
    `Editor: delete photo collection "${slug}"`,
  );

  return Response.json({ ok: true });
}
