import { MusicReleaseGallery } from "../../components/MusicReleaseGallery";
import { ServiceIcon } from "../../lib/service-icons";
import musicReleases from "../../data/music-releases.json";

const sortedReleases = [...musicReleases].sort((a, b) => {
  const aDogGods = a.slug === "dog-gods-singles";
  const bDogGods = b.slug === "dog-gods-singles";
  if (aDogGods || bDogGods) return aDogGods ? 1 : -1;
  return Number(b.year) - Number(a.year);
});

const SOUNDCLOUD_SINGLES = [
  {
    title: "Monster Trucks",
    href: "https://soundcloud.com/marck-96594539/monster-trucks?in=marck-96594539/sets/marck-music",
  },
  {
    title: "Iceman",
    href: "https://soundcloud.com/marck-96594539/iceman?in=marck-96594539/sets/misc",
  },
];

export default function MusicPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <h1
          style={{
            fontSize: 52,
            color: "var(--accent)",
            textShadow: "3px 3px 0 var(--ink)",
          }}
        >
          Music
        </h1>
      </section>

      <section className="wrap section" style={{ borderTop: "3px solid var(--ink)", paddingTop: "var(--space-5)" }}>
        <h2 className="section-title">Releases</h2>
        <p className="section-note" style={{ fontSize: 16 }}>tap a cover, pick a service</p>
        <MusicReleaseGallery releases={sortedReleases} />
      </section>

      <section className="wrap section" style={{ paddingTop: "var(--space-4)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ServiceIcon service="soundcloud" variant="color" size={50} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SOUNDCLOUD_SINGLES.map((single) => (
              <a
                key={single.href}
                href={single.href}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block", padding: "2px 0", fontSize: 19, fontWeight: 600, color: "var(--ink)", textDecoration: "underline" }}
              >
                {single.title}
              </a>
            ))}
          </div>
        </div>

        <a
          href="https://www.youtube.com/playlist?list=PLMyluuYWb_fw0-ZQDLiaBT5AvrxTDAR7c"
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 19, fontWeight: 600, color: "var(--ink)", textDecoration: "underline" }}
        >
          <ServiceIcon service="youtube" variant="color" size={50} />
          <span style={{ display: "block", lineHeight: 1.3 }}>
            My videos
            <br />
            on YouTube
          </span>
        </a>
      </section>
    </main>
  );
}
