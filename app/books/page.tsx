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

      <section className="wrap section">
        <h2 className="section-title">Collections</h2>
        <p className="section-note">click a cover to buy</p>
        <BookGrid books={books.collections} />
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <h2 className="section-title">Anthologies</h2>
        <p className="section-note">Marck's poems alongside other writers, plus one he edited himself</p>
        <BookGrid books={books.anthologies} />
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <a
          href="https://issuu.com/collectivemedia/docs/bluemountainreviewdecember2023"
          target="_blank"
          rel="noreferrer"
          className="card"
          style={{ display: "block", padding: 20, textDecoration: "none", color: "inherit" }}
        >
          <div style={{ fontWeight: 800, fontSize: 15 }}>Read &ldquo;Saint Anonymous&rdquo; (short story) →</div>
        </a>
      </section>

      {kiltySue.audioUrl ? (
        <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{kiltySue.label}</div>
            <audio controls preload="none" style={{ width: "100%", marginTop: 12 }}>
              <source src={kiltySue.audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        </section>
      ) : null}

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <Link
          href="/books/arkansas-literary-forum"
          className="card"
          style={{ display: "flex", alignItems: "center", gap: 16, padding: 20, textDecoration: "none", color: "inherit" }}
        >
          <Image
            src="/ALF/logosmall.jpg"
            alt="Arkansas Literary Forum"
            width={232}
            height={159}
            style={{ width: 64, height: "auto", flexShrink: 0 }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>Arkansas Literary Forum (archive) →</div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
              the online journal Marck edited, 1999&ndash;2008
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
