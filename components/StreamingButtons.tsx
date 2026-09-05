import links from "../data/links.json";

const PLATFORMS = [
  { key: "spotify", label: "Spotify", bg: "var(--spotify)", ink: "var(--spotify-ink)" },
  { key: "appleMusic", label: "Apple Music", bg: "var(--rose)", ink: "var(--rose-ink)" },
  { key: "cdBaby", label: "CD Baby", bg: "var(--gold)", ink: "var(--gold-ink)" },
  { key: "youtube", label: "YouTube", bg: "var(--teal)", ink: "var(--teal-ink)" },
] as const;

export function StreamingButtons() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
      }}
    >
      {PLATFORMS.map((platform) => {
        const url = links.streaming[platform.key];
        const ready = Boolean(url);
        return (
          <a
            key={platform.key}
            href={ready ? url : undefined}
            aria-disabled={!ready}
            target={ready ? "_blank" : undefined}
            rel={ready ? "noreferrer" : undefined}
            className="btn"
            style={{ background: platform.bg, color: platform.ink }}
          >
            {ready ? platform.label : `${platform.label} — soon`}
          </a>
        );
      })}
    </div>
  );
}
