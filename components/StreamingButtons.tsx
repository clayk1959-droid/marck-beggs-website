import links from "../data/links.json";

const PLATFORMS = [
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
  { key: "cdBaby", label: "CD Baby" },
  { key: "youtube", label: "YouTube" },
] as const;

export function StreamingButtons() {
  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
      {PLATFORMS.map((platform) => {
        const url = links.streaming[platform.key];
        const ready = Boolean(url);
        return (
          <li key={platform.key}>
            {ready ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block", padding: "6px 0", fontSize: 19, fontWeight: 600, color: "var(--ink)", textDecoration: "underline" }}
              >
                {platform.label}
              </a>
            ) : (
              <span style={{ display: "inline-block", padding: "6px 0", fontSize: 19, fontWeight: 600, color: "var(--ink-soft)" }}>
                {platform.label}{" "}
                <span className="mono" style={{ fontSize: 14 }}>
                  (Coming Soon)
                </span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
