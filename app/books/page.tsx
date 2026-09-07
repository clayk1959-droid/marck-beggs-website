import Link from "next/link";
import Image from "next/image";
import books from "../../data/books.json";
import { BookGrid } from "../../components/BookGrid";

export default function BooksPage() {
  const kiltySue = books.extras.kiltySueReading;

  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <h1 style={{ fontSize: 44, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Writings
        </h1>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)", paddingTop: "var(--space-5)" }}>
        <h2 className="section-title">Collections</h2>
        <p className="section-note">click a cover to buy</p>
        <BookGrid books={books.collections} />
      </section>

      <section className="wrap section" style={{ paddingTop: "var(--space-4)" }}>
        <h2 className="section-title">Anthologies</h2>
        <p className="section-note">Marck's poems alongside other writers, plus one he edited himself</p>
        <BookGrid books={books.anthologies} />
      </section>

      <section className="wrap section" style={{ paddingTop: "var(--space-4)", paddingBottom: "var(--space-4)" }}>
        <a
          href="https://issuu.com/collectivemedia/docs/bluemountainreviewdecember2023"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-block", padding: "6px 0", fontSize: 19, fontWeight: 600, color: "var(--ink)", textDecoration: "underline" }}
        >
          Read &ldquo;Saint Anonymous&rdquo; (short story) →
        </a>
      </section>

      {kiltySue.audioUrl ? (
        <section className="wrap section" style={{ paddingTop: 0, paddingBottom: "var(--space-4)" }}>
          <div style={{ fontWeight: 700, fontSize: 19 }}>{kiltySue.label}</div>
          <audio controls preload="none" style={{ width: "100%", marginTop: 8 }}>
            <source src={kiltySue.audioUrl} type="audio/mpeg" />
          </audio>
        </section>
      ) : null}

      <section className="wrap section" style={{ paddingTop: 0 }}>
        <Link
          href="/books/arkansas-literary-forum"
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "underline", color: "var(--ink)" }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(36,27,46,0.35)",
              borderRadius: 6,
            }}
          >
            <Image src="/ALF/logosmall.jpg" alt="Arkansas Literary Forum" width={232} height={159} style={{ width: 44, height: "auto" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 19 }}>Arkansas Literary Forum (archive) →</div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2, textDecoration: "none" }}>
              the online journal Marck edited, 1999&ndash;2008
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
