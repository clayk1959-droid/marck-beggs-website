import { getEditorSession } from "../../../../lib/editor-session";
import { getFileContent, commitChanges } from "../../../../lib/github-commit";

const DATA_PATH = "data/books.json";

type Book = {
  id: string;
  title: string;
  year?: string;
  publisher?: string;
  note?: string;
  cover: string;
  buyUrl?: string;
};

type BooksData = { collections: Book[]; anthologies: Book[]; extras: unknown };

function listFor(data: BooksData, list: string): Book[] | null {
  if (list === "collections") return data.collections;
  if (list === "anthologies") return data.anthologies;
  return null;
}

export async function PATCH(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const list = typeof body?.list === "string" ? body.list : "";
  if (!id || !list) return Response.json({ error: "Missing id or list." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Books file not found." }, { status: 500 });
  const data: BooksData = JSON.parse(raw);
  const books = listFor(data, list);
  if (!books) return Response.json({ error: "Unknown list." }, { status: 400 });
  const book = books.find((item) => item.id === id);
  if (!book) return Response.json({ error: "Book not found." }, { status: 404 });

  for (const field of ["title", "year", "publisher", "note", "buyUrl"] as const) {
    if (typeof body[field] === "string") book[field] = body[field];
  }

  await commitChanges(
    { writes: [{ path: DATA_PATH, content: JSON.stringify(data, null, 2) + "\n" }] },
    `Editor: update "${book.title}"`,
  );

  return Response.json({ ok: true, book });
}

export async function DELETE(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const list = typeof body?.list === "string" ? body.list : "";
  if (!id || !list) return Response.json({ error: "Missing id or list." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Books file not found." }, { status: 500 });
  const data: BooksData = JSON.parse(raw);
  const books = listFor(data, list);
  if (!books) return Response.json({ error: "Unknown list." }, { status: 400 });
  const removedBook = books.find((item) => item.id === id);
  if (list === "collections") data.collections = books.filter((item) => item.id !== id);
  else data.anthologies = books.filter((item) => item.id !== id);

  await commitChanges(
    {
      writes: [{ path: DATA_PATH, content: JSON.stringify(data, null, 2) + "\n" }],
      deletes: removedBook?.cover ? [removedBook.cover.replace(/^\//, "public/")] : [],
    },
    `Editor: delete book "${id}"`,
  );

  return Response.json({ ok: true });
}
