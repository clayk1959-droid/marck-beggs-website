import { redirect } from "next/navigation";
import Link from "next/link";
import { getEditorSession } from "../../../lib/editor-session";
import books from "../../../data/books.json";
import { BookEditor } from "../../../components/editor/BookEditor";

export default async function EditorBooksPage() {
  const session = await getEditorSession();
  if (!session) redirect("/editor/login");

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
        <h2 className="section-title">Collections</h2>
        <div style={{ marginTop: 12 }}>
          <BookEditor list="collections" initialBooks={books.collections} />
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <h2 className="section-title">Anthologies</h2>
        <div style={{ marginTop: 12 }}>
          <BookEditor list="anthologies" initialBooks={books.anthologies} />
        </div>
      </section>
    </main>
  );
}
