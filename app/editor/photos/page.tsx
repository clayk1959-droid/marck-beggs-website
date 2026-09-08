import { redirect } from "next/navigation";
import Link from "next/link";
import { getEditorSession } from "../../../lib/editor-session";
import collections from "../../../data/photo-collections.json";
import { PhotoCollectionEditor } from "../../../components/editor/PhotoCollectionEditor";

export default async function EditorPhotosPage() {
  const session = await getEditorSession();
  if (!session) redirect("/editor/login");

  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40 }}>
        <Link href="/editor" className="mono" style={{ fontSize: 12 }}>
          ← Editor
        </Link>
        <h1 style={{ fontSize: 30, marginTop: 12, color: "var(--accent)" }}>
          Photos
        </h1>
      </section>

      <section className="wrap section">
        <PhotoCollectionEditor initialCollections={collections} />
      </section>
    </main>
  );
}
