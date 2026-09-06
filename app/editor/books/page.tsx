import { redirect } from "next/navigation";
import Link from "next/link";
import { getEditorSession } from "../../../lib/editor-session";
import books from "../../../data/books.json";

export default async function EditorBooksPage() {
  const session = await getEditorSession();
  if (!session) redirect("/editor/login");

  const allBooks = [...books.collections, ...books.anthologies];

  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40 }}>
        <Link href="/editor" className="mono" style={{ fontSize: 12 }}>
          ← Editor
        </Link>
        <h1 style={{ fontSize: 30, marginTop: 12, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Books
        </h1>
      </section>

      <section className="wrap section">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {allBooks.map((book) => (
            <div key={book.title} className="card" style={{ padding: "14px 18px" }}>
              <div style={{ fontWeight: 700 }}>{book.title}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                {"year" in book ? book.year : ""} {"publisher" in book ? book.publisher : ""}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
