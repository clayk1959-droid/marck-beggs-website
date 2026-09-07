import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <span className="eyebrow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          about
        </span>
        <h1 style={{ fontSize: 44, marginTop: 16, color: "var(--ink)" }}>
          Marck Beggs
        </h1>
      </section>

      <section className="wrap" style={{ paddingBottom: 32 }}>
        <div className="card" style={{ overflow: "hidden", maxWidth: 360, margin: "0 auto" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
            <Image src="/images/site/marck-bio.jpg" alt="Marck Beggs" fill style={{ objectFit: "cover" }} sizes="360px" />
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 16 }}>
            Marck L. Beggs was born in Alameda, California and grew up in a nomadic Air Force family so, essentially,
            he is from nowhere and everywhere.
          </p>
          <p style={{ fontSize: 16 }}>
            He earned a Ph.D. in English from the University of Denver and a Masters of Fine Arts degree from Warren
            Wilson College. He taught at the university level for over 40 years, earning tenure and the title of
            Full Professor along the way.
          </p>
          <p style={{ fontSize: 16 }}>
            He has published four collections of poetry and released numerous solo albums, along with one album
            with his former band, dog gods. His new band, Sloppy Birds, will release its debut in 2027.
          </p>
          <p style={{ fontSize: 16 }}>
            Beggs currently lives in The People&apos;s Republic of Hillcrest in Little Rock, Arkansas with his
            wife, Carly Cate, and various pets.
          </p>
        </div>
      </section>
    </main>
  );
}
