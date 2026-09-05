const HONORS = [
  "Faculty Excellence Award in Scholarly Activity (HSU), 2003",
  "Faculty Excellence Award in Service (HSU), 2001",
  "Friend of WORDS Award, 1999",
  "Arkansas Arts Council Fellowship in Poetry ($5,000), 1997",
  "UALR Writer's Network Poetry Discovery Award, 1995",
  "Academy of American Poets Prize (honorable mention), 1991",
  "Pushcart Prize in Poetry (nomination), 1990, 1996",
];

export default function AboutPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <span className="eyebrow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          about
        </span>
        <h1 style={{ fontSize: 44, marginTop: 16, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Marck Beggs
        </h1>
      </section>

      <section className="wrap section">
        <div className="card" style={{ padding: 24 }}>
          <p style={{ fontSize: 16 }}>
            Marck L. Beggs is a poet, songwriter, and Professor of English at Henderson State University, where
            he&apos;s taught since 1997. He&apos;s the author of four poetry collections with Salmon Poetry in
            Ireland — <em>Blind Verse</em>, <em>Catastrophic Chords</em>, and <em>Libido Café</em> — along with the
            earlier <em>Godworm</em>. Off the page, he fronts the band dog gods on vocals and guitar.
          </p>
          <p style={{ fontSize: 16, marginTop: 16 }}>
            He holds a Ph.D. in English from the University of Denver and an M.F.A. in Creative Writing from Warren
            Wilson College, and has served as Assistant Poetry Editor of <em>Crazyhorse</em> and Managing Editor of{" "}
            <em>Denver Quarterly</em>.
          </p>
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <h2 className="section-title">Education</h2>
        <div className="card" style={{ padding: 20, marginTop: 12 }}>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
            <li>Ph.D. in English — University of Denver, 1991</li>
            <li>M.F.A. in Creative Writing — Warren Wilson College, 1987</li>
            <li>B.A. in English, minor in Women&apos;s Studies — University of Arkansas at Little Rock, 1984</li>
          </ul>
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <h2 className="section-title">Honors &amp; Fellowships</h2>
        <div className="card" style={{ padding: 20, marginTop: 12 }}>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
            {HONORS.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <details className="card" style={{ padding: 20 }}>
          <summary className="mono" style={{ cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            Full academic CV
          </summary>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>ADMINISTRATION</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                <li>Dean of HSU Graduate School, 2002–2010</li>
                <li>Board of Trustees, Excelsior College, 2007–2013</li>
                <li>Director of Master of Liberal Arts Program, July 1999–July 2002</li>
                <li>Online Instructor at Excelsior College, 1999–2019</li>
              </ul>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>EDITING</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                <li>Proscenium (student writing and art), 1998–present</li>
                <li>Arkansas Poets Roundtable 80th Anniversary Anthology, 2013</li>
                <li>Crazyhorse, Assistant Poetry Editor, 1983–88 / 1994–99</li>
                <li>Denver Quarterly, Managing Editor, 1989–91</li>
              </ul>
            </div>
          </div>
        </details>
      </section>
    </main>
  );
}
