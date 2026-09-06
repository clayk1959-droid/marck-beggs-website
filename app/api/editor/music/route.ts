import { getEditorSession } from "../../../../lib/editor-session";
import { getFileContent, commitChanges } from "../../../../lib/github-commit";

const DATA_PATH = "data/music-art.json";

type ArtItem = { image: string; label: string };

export async function PATCH(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const image = typeof body?.image === "string" ? body.image : "";
  if (!image) return Response.json({ error: "Missing image." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Music art file not found." }, { status: 500 });
  const items: ArtItem[] = JSON.parse(raw);
  const item = items.find((entry) => entry.image === image);
  if (!item) return Response.json({ error: "Art item not found." }, { status: 404 });

  if (typeof body.label === "string") item.label = body.label;

  await commitChanges(
    { writes: [{ path: DATA_PATH, content: JSON.stringify(items, null, 2) + "\n" }] },
    `Editor: update music art label`,
  );

  return Response.json({ ok: true, item });
}

export async function DELETE(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const image = typeof body?.image === "string" ? body.image : "";
  if (!image) return Response.json({ error: "Missing image." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Music art file not found." }, { status: 500 });
  const items: ArtItem[] = JSON.parse(raw);
  const remaining = items.filter((entry) => entry.image !== image);
  if (remaining.length === items.length) return Response.json({ error: "Art item not found." }, { status: 404 });

  await commitChanges(
    {
      writes: [{ path: DATA_PATH, content: JSON.stringify(remaining, null, 2) + "\n" }],
      deletes: [image.replace(/^\//, "public/")],
    },
    `Editor: delete music art`,
  );

  return Response.json({ ok: true });
}
