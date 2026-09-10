import { MusicReleaseGallery } from "../../components/MusicReleaseGallery";
import { SoundcloudSinglesList } from "../../components/SoundcloudSinglesList";
import { ServiceIcon } from "../../lib/service-icons";
import musicReleasesData from "../../data/music-releases.json";

type Release = {
  slug: string;
  title: string;
  year: string;
  credit?: string;
  cover: string;
  links?: Record<string, string>;
  tracks?: { title: string; note?: string; audioUrl?: string }[];
  // Stamped once at creation by the editor's add-release route; never
  // touched by an edit. See app/api/editor/music/route.ts.
  addedAt?: string;
};

const musicReleases = musicReleasesData as Release[];

const DOG_GODS_ORDER = ["dog-gods-2008", "dog-gods-singles"];

const sortedReleases = [...musicReleases].sort((a, b) => {
  const aDogGods = DOG_GODS_ORDER.indexOf(a.slug);
  const bDogGods = DOG_GODS_ORDER.indexOf(b.slug);
  if (aDogGods !== -1 || bDogGods !== -1) {
    if (aDogGods !== -1 && bDogGods !== -1) return aDogGods - bDogGods;
    return aDogGods !== -1 ? 1 : -1;
  }
  // Same year on both sides (e.g. two releases both from this year): fall
  // back to when each was actually added, newest first, so the newest
  // release always leads without needing a manual reorder. Releases from
  // before this field existed have no addedAt at all -- treated as older
  // than anything that does, via the "" fallback (an empty string always
  // sorts before a real ISO timestamp).
  return Number(b.year) - Number(a.year) || (b.addedAt || "").localeCompare(a.addedAt || "");
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
            color: "var(--ink)",
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
          <div
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(36,27,46,0.35)",
              borderRadius: 6,
            }}
          >
            <ServiceIcon service="soundcloud" variant="color" size={44} />
          </div>
          <SoundcloudSinglesList singles={SOUNDCLOUD_SINGLES} />
        </div>

        <a
          href="https://www.youtube.com/playlist?list=PLMyluuYWb_fw0-ZQDLiaBT5AvrxTDAR7c"
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 19, fontWeight: 600, color: "var(--ink)", textDecoration: "underline" }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(36,27,46,0.35)",
              borderRadius: 6,
            }}
          >
            <ServiceIcon service="youtube" variant="color" size={44} />
          </div>
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
