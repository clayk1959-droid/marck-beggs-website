import Image from "next/image";
import Link from "next/link";
import { Stardos_Stencil, Special_Elite } from "next/font/google";
import { RotatingCoverBox } from "../components/RotatingCoverBox";
import musicRotation from "../data/home-music-rotation.json";
import books from "../data/books.json";

const stencil = Stardos_Stencil({ subsets: ["latin"], weight: "700" });
const typewriter = Special_Elite({ subsets: ["latin"], weight: "400" });

const writingRotation = [...books.collections, ...books.anthologies].map((book) => ({
  image: book.cover,
  label: book.title,
}));

export default function HomePage() {
  return (
    <main className={typewriter.className}>
      <section className="wrap" style={{ paddingTop: 32, paddingBottom: 24, textAlign: "center" }}>
        <h1
          className={stencil.className}
          style={{ fontSize: 44, color: "var(--ink)", letterSpacing: "0.02em", textTransform: "uppercase" }}
        >
          Marck L. Beggs
        </h1>
        <p style={{ fontSize: 18, marginTop: 10 }}>Poet | Songwriter</p>
      </section>

      <section className="wrap" style={{ paddingBottom: 32 }}>
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
        <div className="card" style={{ display: "flex", overflow: "hidden" }}>
          <Link href="/music" style={{ flex: 1, textDecoration: "none", color: "inherit", borderRight: "3px solid var(--ink)" }}>
            <RotatingCoverBox images={musicRotation} />
          </Link>
          <Link href="/books" style={{ flex: 1, textDecoration: "none", color: "inherit" }}>
            <RotatingCoverBox images={writingRotation} />
          </Link>
        </div>
        <div style={{ display: "flex", marginTop: 12 }}>
          <Link href="/music" style={{ flex: 1, textAlign: "center", textDecoration: "none", color: "inherit" }}>
            <span style={{ fontSize: 20 }}>Music</span>
          </Link>
          <Link href="/books" style={{ flex: 1, textAlign: "center", textDecoration: "none", color: "inherit" }}>
            <span style={{ fontSize: 20 }}>Writings</span>
          </Link>
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)", textAlign: "center" }}>
        <Link
          href="/about"
          className="card"
          style={{ display: "inline-block", textDecoration: "none", color: "inherit", padding: "16px 40px", fontSize: 20 }}
        >
          Bio
        </Link>
      </section>
    </main>
  );
}
