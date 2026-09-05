import Image from "next/image";
import Link from "next/link";
import { StreamingButtons } from "../components/StreamingButtons";

export default function HomePage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, paddingBottom: 24, textAlign: "center" }}>
        <span className="eyebrow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          poet · songwriter · professor
        </span>
        <h1 style={{ fontSize: 44, marginTop: 18, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Marck Beggs
        </h1>
        <p style={{ maxWidth: 480, margin: "18px auto 0", fontSize: 17, fontWeight: 500 }}>
          Four poetry collections with Salmon Poetry. A working band called dog gods. A long life in the classroom.
          One place to find all of it.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 40 }}>
        <div className="card" style={{ overflow: "hidden", maxWidth: 420, margin: "0 auto" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
            <Image
              src="/images/site/marck-hero.jpg"
              alt="Marck Beggs playing guitar"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="420px"
            />
          </div>
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <div className="section-note">hit play →</div>
        <StreamingButtons />
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link href="/music" className="mono" style={{ fontSize: 13, textDecoration: "underline" }}>
            all six songs from dog gods →
          </Link>
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <Link href="/books" className="card" style={{ textDecoration: "none", color: "inherit", padding: 20 }}>
            <h2 style={{ fontSize: 20 }}>Books</h2>
            <p className="mono" style={{ fontSize: 12, marginTop: 6, color: "var(--ink-soft)" }}>
              four collections + anthologies
            </p>
          </Link>
          <Link href="/about" className="card" style={{ textDecoration: "none", color: "inherit", padding: 20 }}>
            <h2 style={{ fontSize: 20 }}>About</h2>
            <p className="mono" style={{ fontSize: 12, marginTop: 6, color: "var(--ink-soft)" }}>
              bio, teaching, full CV
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
