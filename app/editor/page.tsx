import { redirect } from "next/navigation";
import Link from "next/link";
import { getEditorSession } from "../../lib/editor-session";
import { EditorLogoutButton } from "../../components/EditorLogoutButton";
import collections from "../../data/photo-collections.json";
import books from "../../data/books.json";
import musicReleases from "../../data/music-releases.json";

const SECTIONS = [
  { href: "/editor/music", label: "Music", count: musicReleases.length },
  { href: "/editor/books", label: "Books", count: books.collections.length + books.anthologies.length },
  { href: "/editor/photos", label: "Photos", count: collections.length },
];

export default async function EditorDashboardPage() {
  const session = await getEditorSession();
  if (!session) redirect("/editor/login");

  return (
    <main>
      <section
        className="wrap"
        style={{ paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div>
          <h1 style={{ fontSize: 30, color: "var(--accent)" }}>Editor</h1>
          <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
            signed in as {session.name}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <EditorLogoutButton />
          <Link href="/editor/guide" className="mono" style={{ fontSize: 13, textDecoration: "underline" }}>
            How to use this →
          </Link>
          <Link href="/site-guide.html" className="mono" style={{ fontSize: 13, textDecoration: "underline" }}>
            Site Guide →
          </Link>
        </div>
      </section>

      <section className="wrap section">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 20px",
                textDecoration: "none",
                color: "inherit",
                background: "rgba(36, 27, 46, 0.15)",
              }}
            >
              <h2 style={{ fontSize: 20 }}>{section.label}</h2>
              <span className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                {section.count} item{section.count === 1 ? "" : "s"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
