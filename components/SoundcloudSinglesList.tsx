"use client";

import { useState } from "react";
import { getEmbedUrl } from "../lib/streaming-embed";

type Single = { title: string; href: string };

export function SoundcloudSinglesList({ singles }: { singles: Single[] }) {
  const [openHref, setOpenHref] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {singles.map((single) => {
        const isOpen = openHref === single.href;
        const embedUrl = getEmbedUrl("soundcloud", single.href);
        return (
          <div key={single.href}>
            <button
              type="button"
              onClick={() => setOpenHref(isOpen ? null : single.href)}
              className="mono"
              style={{
                display: "inline-block",
                padding: "2px 0",
                fontSize: 19,
                fontWeight: 600,
                color: "var(--ink)",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {single.title}
            </button>
            {isOpen && embedUrl ? (
              <div style={{ marginTop: 4, marginBottom: 8, maxWidth: 400 }}>
                <iframe
                  src={embedUrl}
                  width="100%"
                  height={166}
                  style={{ border: "none", display: "block" }}
                  allow="autoplay; encrypted-media; fullscreen"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => setOpenHref(null)}
                  className="mono"
                  style={{
                    display: "block",
                    marginTop: 4,
                    padding: "4px 0",
                    fontSize: 12,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "var(--ink-soft)",
                  }}
                >
                  × Close
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
