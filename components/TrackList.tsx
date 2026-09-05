import tracks from "../data/tracks.json";

const DOT_COLORS = ["var(--accent)", "var(--gold)", "var(--teal)", "var(--accent)", "var(--gold)", "var(--teal)"];

export function TrackList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {tracks.map((track, index) => (
        <div key={track.title} className="card" style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              className="mono"
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: DOT_COLORS[index % DOT_COLORS.length],
                color: "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{track.title}</div>
              {track.note ? (
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                  {track.note}
                </div>
              ) : null}
            </div>
          </div>
          {track.audioUrl ? (
            <audio controls preload="none" style={{ width: "100%", marginTop: 10 }}>
              <source src={track.audioUrl} type="audio/mpeg" />
            </audio>
          ) : null}
        </div>
      ))}
    </div>
  );
}
