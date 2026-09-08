import Image from "next/image";
import Link from "next/link";
import { RotatingCoverBox } from "../components/RotatingCoverBox";
import musicRotation from "../data/home-music-rotation.json";
import books from "../data/books.json";

const writingRotation = [...books.collections, ...books.anthologies].map((book) => ({
  image: book.cover,
  label: book.title,
}));

const ROTATION_INTERVAL_MS = 5500;

export default function HomePage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: "var(--space-4)", paddingBottom: "var(--space-2)", textAlign: "center" }}>
        <h1 style={{ fontSize: 44, lineHeight: 0.92, color: "var(--ink)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
          Marck L. Beggs
        </h1>
        <p style={{ fontSize: 20, marginTop: 0 }}>Poet | Songwriter</p>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--space-4)" }}>
        <div className="card" style={{ overflow: "hidden", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
            <Image
              src="/images/site/marck-hero.jpg"
              alt="Marck Beggs playing guitar"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="600px"
            />
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--space-4)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", borderTop: "3px solid var(--ink)", paddingTop: "var(--space-4)" }}>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <Link href="/music" style={{ flex: 1, textAlign: "center", textDecoration: "none", color: "inherit" }}>
              <span style={{ fontSize: 23 }}>Music</span>
            </Link>
            <Link href="/books" style={{ flex: 1, textAlign: "center", textDecoration: "none", color: "inherit" }}>
              <span style={{ fontSize: 23 }}>Writings</span>
            </Link>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-1)" }}>
            <Link href="/music" style={{ flex: 1, textDecoration: "none", color: "inherit" }}>
              <div className="card" style={{ overflow: "hidden" }}>
                <RotatingCoverBox images={musicRotation} intervalMs={ROTATION_INTERVAL_MS} startDelayMs={ROTATION_INTERVAL_MS} />
              </div>
            </Link>
            <Link href="/books" style={{ flex: 1, textDecoration: "none", color: "inherit" }}>
              <div className="card" style={{ overflow: "hidden" }}>
                <RotatingCoverBox images={writingRotation} intervalMs={ROTATION_INTERVAL_MS} startDelayMs={ROTATION_INTERVAL_MS / 2} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
