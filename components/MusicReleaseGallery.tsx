"use client";

import Image from "next/image";
import { useState } from "react";
import { getEmbedUrl, SERVICE_LABELS, StreamingService } from "../lib/streaming-embed";

type Release = {
  slug: string;
  title: string;
  year: string;
  credit?: string;
  cover: string;
  links: Record<StreamingService, string>;
};

const SERVICES: StreamingService[] = ["spotify", "apple", "youtube", "soundcloud", "pandora"];

const EMBED_HEIGHT: Record<StreamingService, number> = {
  spotify: 152,
  apple: 175,
  youtube: 220,
  soundcloud: 166,
  pandora: 0,
};

export function MusicReleaseGallery({ releases }: { releases: Release[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [embedService, setEmbedService] = useState<StreamingService | null>(null);

  const active = releases.find((r) => r.slug === activeSlug) || null;

  function close() {
    setActiveSlug(null);
    setEmbedService(null);
  }

  return (
    <>
      <div className="photo-grid">
        {releases.map((release) => (
          <button
            key={release.slug}
            type="button"
            onClick={() => {
              setActiveSlug(release.slug);
              setEmbedService(null);
            }}
            className="card"
            style={{ padding: 0, overflow: "hidden", cursor: "pointer", background: "none" }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
              <Image src={release.cover} alt={release.title} fill style={{ objectFit: "cover" }} sizes="(min-width: 640px) 220px, 45vw" />
              <div
                className="mono"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "6px 0",
                  textAlign: "center",
                  background: "rgba(36,27,46,0.82)",
                  color: "#fff",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Listen
              </div>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="card"
            style={{ background: "var(--bg)", maxWidth: 420, width: "100%", padding: 24, position: "relative" }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "var(--ink)" }}
            >
              ×
            </button>
            <h3 style={{ fontSize: 22, color: "var(--accent)", textShadow: "2px 2px 0 var(--ink)" }}>{active.title}</h3>
            <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
              {[active.year, active.credit].filter(Boolean).join(" · ")}
            </p>

            {embedService ? (
              <div style={{ marginTop: 16 }}>
                <button
                  type="button"
                  onClick={() => setEmbedService(null)}
                  className="mono"
                  style={{ fontSize: 12, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0, marginBottom: 10 }}
                >
                  ← back
                </button>
                <iframe
                  src={getEmbedUrl(embedService, active.links[embedService]) || ""}
                  width="100%"
                  height={EMBED_HEIGHT[embedService]}
                  style={{ border: "none", display: "block" }}
                  allow="autoplay; encrypted-media; fullscreen"
                  loading="lazy"
                />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                {SERVICES.map((service) => {
                  const url = active.links[service];
                  if (!url) {
                    return (
                      <span key={service} className="btn" aria-disabled="true" style={{ fontSize: 13 }}>
                        {SERVICE_LABELS[service]} — soon
                      </span>
                    );
                  }
                  const embeddable = Boolean(getEmbedUrl(service, url));
                  if (embeddable) {
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setEmbedService(service)}
                        className="btn"
                        style={{ fontSize: 13, cursor: "pointer" }}
                      >
                        {SERVICE_LABELS[service]}
                      </button>
                    );
                  }
                  return (
                    <a key={service} href={url} target="_blank" rel="noreferrer" className="btn" style={{ fontSize: 13 }}>
                      {SERVICE_LABELS[service]} ↗
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
