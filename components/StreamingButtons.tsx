import links from "../data/links.json";

const PLATFORMS = [
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
  { key: "cdBaby", label: "CD Baby" },
  { key: "youtube", label: "YouTube" },
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
          >
            {ready ? platform.label : `${platform.label} — soon`}
          </a>
        );
      })}
    </div>
  );
}
