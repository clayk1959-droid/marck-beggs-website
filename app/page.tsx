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
        <h1 style={{ fontSize: "clamp(34px, 10vw, 52px)", lineHeight: 0.92, color: "var(--ink)", letterSpacing: "0.02em", textTransform: "uppercase", textWrap: "balance" }}>
          Marck L. Beggs
        </h1>
        <p style={{ fontSize: 20, marginTop: 0 }}>Poet | Songwriter</p>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--space-4)" }}>
        <div
          style={{
            overflow: "hidden",
            maxWidth: 420,
            margin: "0 auto",
            border: "none",
            boxShadow: "none",
            background: "transparent",
          }}
        >
          <div style={{ position: "relative", width: "100%", aspectRatio: "656 / 1000" }}>
            <Image
              src="/images/site/marck-hero.jpg"
              alt="Marck Beggs"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="420px"
            />
          </div>
        </div>
      </section>

      <section className="wrap" style={{ borderTop: "3px solid var(--ink)", paddingTop: "var(--space-4)", paddingBottom: "var(--space-4)" }}>
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
      </section>
    </main>
  );
}
