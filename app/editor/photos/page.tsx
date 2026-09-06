import { redirect } from "next/navigation";
import Link from "next/link";
import { getEditorSession } from "../../../lib/editor-session";
import collections from "../../../data/photo-collections.json";

export default async function EditorPhotosPage() {
  const session = await getEditorSession();
  if (!session) redirect("/editor/login");

  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40 }}>
        <Link href="/editor" className="mono" style={{ fontSize: 12 }}>
          ← Editor
        </Link>
        <h1 style={{ fontSize: 30, marginTop: 12, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Photos
        </h1>
      </section>

      <section className="wrap section">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {collections.map((collection) => (
            <div key={collection.slug} className="card" style={{ padding: "14px 18px" }}>
              <div style={{ fontWeight: 700 }}>{collection.title}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                {collection.subtitle} · {collection.photos.length} photos
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
