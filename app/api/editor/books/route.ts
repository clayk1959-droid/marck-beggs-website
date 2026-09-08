import { getEditorSession } from "../../../../lib/editor-session";
import { getFileContent, commitChanges, type CommitWrite } from "../../../../lib/github-commit";
import { resizeCoverImage } from "../../../../lib/image-resize";
import { notifyEditorChange, notifyEditorFailure } from "../../../../lib/editor-notify";
import { del } from "@vercel/blob";

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

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
  const list = typeof body?.list === "string" ? body.list : "";
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const coverBlobUrl = typeof body?.coverBlobUrl === "string" ? body.coverBlobUrl : "";
  if (list !== "collections" && list !== "anthologies") return Response.json({ error: "Unknown list." }, { status: 400 });
  if (!title) return Response.json({ error: "Title is required." }, { status: 400 });
  if (!coverBlobUrl) return Response.json({ error: "Cover image is required." }, { status: 400 });

  const raw = await getFileContent(DATA_PATH);
  if (!raw) return Response.json({ error: "Books file not found." }, { status: 500 });
  const data: BooksData = JSON.parse(raw);
  const books = listFor(data, list)!;

  const baseId = slugify(title) || "book";
  let id = baseId;
  let suffix = 2;
  const allIds = new Set([...data.collections, ...data.anthologies].map((b) => b.id));
  while (allIds.has(id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }

  let coverBuffer: Buffer;
  try {
    coverBuffer = await fetchAndResizeCover(coverBlobUrl);
  } catch {
    return Response.json({ error: "Could not process the uploaded cover image." }, { status: 400 });
  }

  const book: Book = { id, title, cover: `/images/books/${id}.jpg` };
  for (const field of ["year", "publisher", "note", "buyUrl"] as const) {
    if (typeof body[field] === "string" && body[field]) book[field] = body[field];
  }
  books.push(book);

  try {
    await commitChanges(
      {
        writes: [
          { path: DATA_PATH, content: JSON.stringify(data, null, 2) + "\n" },
          { path: `public/images/books/${id}.jpg`, content: coverBuffer.toString("base64"), encoding: "base64" },
        ],
      },
      `Editor (${session.name}): add book "${title}"`,
    );
  } catch (error) {
    await notifyEditorFailure(session.name, `add a new book ("${title}")`, error);
    return Response.json({ error: "Failed to save. Clay has been notified." }, { status: 502 });
  }

  await del(coverBlobUrl).catch(() => {});
  await notifyEditorChange(session.name, `added a new book: "${title}"`);

  return Response.json({ ok: true, book });
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

  const coverBlobUrl = typeof body.coverBlobUrl === "string" ? body.coverBlobUrl : "";
  const writes: CommitWrite[] = [];
  if (coverBlobUrl) {
    let coverBuffer: Buffer;
    try {
      coverBuffer = await fetchAndResizeCover(coverBlobUrl);
    } catch {
      return Response.json({ error: "Could not process the uploaded cover image." }, { status: 400 });
    }
    book.cover = `/images/books/${id}.jpg`;
    writes.push({ path: `public/images/books/${id}.jpg`, content: coverBuffer.toString("base64"), encoding: "base64" });
  }
  writes.push({ path: DATA_PATH, content: JSON.stringify(data, null, 2) + "\n" });

  try {
    await commitChanges({ writes }, `Editor (${session.name}): update "${book.title}"`);
  } catch (error) {
    await notifyEditorFailure(session.name, `update the book "${book.title}"`, error);
    return Response.json({ error: "Failed to save. Clay has been notified." }, { status: 502 });
  }

  if (coverBlobUrl) await del(coverBlobUrl).catch(() => {});
  await notifyEditorChange(session.name, `edited the book "${book.title}"`);

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

  try {
    await commitChanges(
      {
        writes: [{ path: DATA_PATH, content: JSON.stringify(data, null, 2) + "\n" }],
        deletes: removedBook?.cover ? [removedBook.cover.replace(/^\//, "public/")] : [],
      },
      `Editor (${session.name}): delete book "${id}"`,
    );
  } catch (error) {
    await notifyEditorFailure(session.name, `delete the book "${id}"`, error);
    return Response.json({ error: "Failed to delete. Clay has been notified." }, { status: 502 });
  }

  await notifyEditorChange(session.name, `deleted the book "${removedBook?.title || id}"`);

  return Response.json({ ok: true });
}
