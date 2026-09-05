import Image from "next/image";
import { StreamingButtons } from "../../components/StreamingButtons";
import { TrackList } from "../../components/TrackList";

export default function MusicPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <span className="eyebrow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          Arkansas rock &amp; roll
        </span>
        <h1
          style={{
            fontSize: 52,
            marginTop: 16,
            color: "var(--accent)",
            textShadow: "3px 3px 0 var(--ink)",
          }}
        >
          dog gods
        </h1>
        <p className="mono" style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>
          (sometimes known as Bohemian Sauce)
        </p>
        <p style={{ maxWidth: 420, margin: "16px auto 0", fontWeight: 500 }}>
          Marck L. Beggs: vocals &amp; guitar · Luke Pittman: guitar, bass &amp; vocals · Craig Seager: drums &amp; bass
        </p>
      </section>

      <section className="wrap section">
        <div className="section-note" style={{ textAlign: "center" }}>
          hit play →
        </div>
        <StreamingButtons />
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <h2 className="section-title">New Jams</h2>
        <p className="section-note">six cuts off the forthcoming record (plus one live ringer) — press play below</p>
        <TrackList />
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <h2 className="section-title">Cover Art</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 16,
          }}
        >
          {["/images/music/doggods-poster-1.jpg", "/images/music/doggods-art-1.jpg", "/images/music/doggods-art-2.jpg", "/images/music/doggods-poster-2.jpg"].map(
            (src) => (
              <div key={src} className="card" style={{ overflow: "hidden", padding: 8 }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
                  <Image src={src} alt="dog gods cover art" fill style={{ objectFit: "cover" }} sizes="45vw" />
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
