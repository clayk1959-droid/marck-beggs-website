import { redirect } from "next/navigation";
import Link from "next/link";
import { getEditorSession } from "../../../lib/editor-session";
import musicReleases from "../../../data/music-releases.json";
import { MusicReleaseEditor } from "../../../components/editor/MusicReleaseEditor";

export default async function EditorMusicPage() {
  const session = await getEditorSession();
  if (!session) redirect("/editor/login");

  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40 }}>
        <Link href="/editor" className="mono" style={{ fontSize: 12 }}>
          ← Editor
        </Link>
        <h1 style={{ fontSize: 30, marginTop: 12, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Music Releases
        </h1>
      </section>

      <section className="wrap section">
        <MusicReleaseEditor initialReleases={musicReleases} />
      </section>
    </main>
  );
}
