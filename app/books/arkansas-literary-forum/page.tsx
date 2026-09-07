import Link from "next/link";
import Image from "next/image";

const VOLUMES = [
  { year: "1999", label: "Volume 1: 1999" },
  { year: "2000", label: "Volume 2: 2000" },
  { year: "2001", label: "Volume 3: 2001" },
  { year: "2002", label: "Volume 4: 2002" },
  { year: "2003", label: "Volume 5: 2003" },
  { year: "2004", label: "Volume 6: 2004" },
  { year: "2005", label: "Volume 7: 2005" },
  { year: "2006", label: "Volume 8: 2006" },
  { year: "2007", label: "Volume 9: 2007" },
  { year: "2008", label: "Volume 10: 2008", note: "the final issue" },
];

const INFO_LINKS = [
  { href: "/ALF/abouteditors.html", label: "About the Editor" },
  { href: "/ALF/links.html", label: "Arkansas Literary Links" },
  { href: "/ALF/missionstatement.html", label: "Mission Statement" },
  { href: "/ALF/note.html", label: "Note to Educators" },
  { href: "/ALF/sub.html", label: "Submissions" },
  { href: "/ALF/rejectionletter.html", label: "Our Standard Rejection Letter" },
];

export default function ArkansasLiteraryForumPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <Link href="/books" className="mono" style={{ fontSize: 12, display: "inline-block", marginBottom: 16 }}>
          ← Writings
        </Link>
        <Image
          src="/ALF/logo.jpg"
          alt="Arkansas Literary Forum"
          width={471}
          height={253}
          style={{ width: "100%", maxWidth: 300, height: "auto", margin: "0 auto" }}
        />
        <h1 style={{ fontSize: 40, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)", marginTop: 12 }}>
          Arkansas Literary Forum
        </h1>
        <p style={{ maxWidth: 480, margin: "16px auto 0" }}>
          An online journal of literature and art that Marck founded and edited from 1999 to
          2008, publishing short stories, poetry, essays, and artwork by writers and artists
          with ties to Arkansas.
        </p>
        <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 12 }}>
          Preserved here exactly as it was originally published — the pages below are not
          restyled for this site.
        </p>
      </section>

      <section className="wrap section">
        <h2 className="section-title">Issues</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {VOLUMES.map((volume) => (
            <a
              key={volume.year}
              href={`/ALF/${volume.year}/${volume.year}.html`}
              target="_blank"
              rel="noreferrer"
              className="card"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", textDecoration: "none", color: "inherit" }}
            >
              <span style={{ fontWeight: 700 }}>{volume.label}</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
                {volume.note ? `${volume.note} · ` : ""}open ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)" }}>
        <h2 className="section-title">About the Journal</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {INFO_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="card"
              style={{ display: "block", padding: "12px 18px", textDecoration: "none", color: "inherit", fontWeight: 600 }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
