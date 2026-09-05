import Image from "next/image";
import Link from "next/link";

const FEATURED_CARDS = [
  {
    href: "/music",
    label: "Music",
    note: "dog gods",
    image: "/images/music/doggods-art-1.jpg",
    alt: "dog gods cover art",
  },
  {
    href: "/books",
    label: "Books",
    note: "Blind Verse, 2015",
    image: "/images/books/blind-verse.jpg",
    alt: "Blind Verse book cover",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, paddingBottom: 24, textAlign: "center" }}>
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: 44, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
            Marck Beggs
          </h1>
          <div className="hero-tagline">
            <span>Poet</span>
            <span>·</span>
            <span>Songwriter</span>
            <span>·</span>
            <span>Professor</span>
          </div>
        </div>
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {FEATURED_CARDS.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="card" style={{ overflow: "hidden" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}>
                  <Image src={item.image} alt={item.alt} fill style={{ objectFit: "cover" }} sizes="(min-width: 640px) 340px, 45vw" />
                </div>
              </div>
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <h2 style={{ fontSize: 20 }}>{item.label}</h2>
                <p className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                  {item.note}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)", textAlign: "center" }}>
        <Link href="/about" className="card" style={{ display: "inline-block", textDecoration: "none", color: "inherit", padding: "20px 32px" }}>
          <h2 style={{ fontSize: 20 }}>About</h2>
          <p className="mono" style={{ fontSize: 12, marginTop: 6, color: "var(--ink-soft)" }}>
            bio, teaching, full CV
          </p>
        </Link>
      </section>
    </main>
  );
}
