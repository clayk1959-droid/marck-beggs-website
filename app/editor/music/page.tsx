import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getEditorSession } from "../../../lib/editor-session";
import musicArt from "../../../data/music-art.json";

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
          Music Cover Art
        </h1>
      </section>

      <section className="wrap section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 14 }}>
          {musicArt.map((art) => (
            <div key={art.image} className="card" style={{ overflow: "hidden", padding: 6 }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
                <Image src={art.image} alt={art.label || "cover art"} fill style={{ objectFit: "cover" }} sizes="140px" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
