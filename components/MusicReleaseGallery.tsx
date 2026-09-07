"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getEmbedUrl, SERVICE_LABELS, StreamingService } from "../lib/streaming-embed";

type Track = { title: string; note?: string; audioUrl: string };

type Release = {
  slug: string;
  title: string;
  year: string;
  credit?: string;
  cover: string;
  links?: Record<StreamingService, string>;
  tracks?: Track[];
};

const SERVICES: StreamingService[] = ["spotify", "apple", "youtube", "soundcloud", "pandora"];

const EMBED_HEIGHT: Record<StreamingService, number> = {
  spotify: 152,
  apple: 175,
  youtube: 220,
  soundcloud: 166,
  pandora: 0,
};

function TrackPlayer({ release, onClose }: { release: Release; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const tracks = release.tracks || [];
  const currentTrack = currentIndex !== null ? tracks[currentIndex] : null;

  useEffect(() => {
    if (currentIndex !== null) {
      audioRef.current?.play().catch(() => {});
    }
  }, [currentIndex]);

  function handleTrackClick(index: number) {
    if (index === currentIndex) {
      if (isPlaying) audioRef.current?.pause();
      else audioRef.current?.play().catch(() => {});
    } else {
      setCurrentIndex(index);
    }
  }

  function handleEnded() {
    if (currentIndex !== null && currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsPlaying(false);
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Image src={release.cover} alt="" fill style={{ objectFit: "cover", opacity: 0.16, filter: "saturate(0.35) brightness(1.4)" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--bg)", opacity: 0.55 }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", padding: 24 }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "var(--ink)" }}
        >
          ×
        </button>
        <h3 style={{ fontSize: 20, color: "var(--accent)", textShadow: "2px 2px 0 var(--ink)", paddingRight: 30 }}>{release.title}</h3>
        <p className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
          {[release.year, release.credit].filter(Boolean).join(" · ")}
        </p>

        <div style={{ flex: 1, overflowY: "auto", marginTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
          {tracks.map((track, index) => {
            const isCurrent = index === currentIndex;
            return (
              <button
                key={track.title}
                type="button"
                onClick={() => handleTrackClick(index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "7px 6px",
                  background: isCurrent ? "rgba(36,27,46,0.08)" : "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13, color: isCurrent ? "var(--accent)" : "var(--ink)", width: 16, flexShrink: 0 }}>
                  {isCurrent && isPlaying ? "❚❚" : "▶"}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ fontWeight: isCurrent ? 800 : 600, fontSize: 14, display: "block" }}>{track.title}</span>
                  {track.note ? (
                    <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>
                      {track.note}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        {currentTrack ? (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "2px solid var(--ink)" }}>
            <div className="mono" style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>
              {currentTrack.title}
            </div>
            <audio
              ref={audioRef}
              controls
              src={currentTrack.audioUrl}
              style={{ width: "100%", height: 32, display: "block" }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleEnded}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function MusicReleaseGallery({ releases }: { releases: Release[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [embedService, setEmbedService] = useState<StreamingService | null>(null);

  const active = releases.find((r) => r.slug === activeSlug) || null;
  const hasTracks = Boolean(active?.tracks && active.tracks.length > 0);

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
              {release.slug === "new-jams" ? (
                <div
                  className="mono"
                  style={{
                    position: "absolute",
                    top: 18,
                    left: -38,
                    width: 160,
                    transform: "rotate(-45deg)",
                    background: "var(--accent)",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "5px 0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.35)",
                    zIndex: 2,
                  }}
                >
                  New Jams
                </div>
              ) : null}
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
            <div style={{ padding: "8px 10px", textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{release.title}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                {release.year}
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
          {hasTracks ? (
            <div
              onClick={(event) => event.stopPropagation()}
              className="card"
              style={{ background: "var(--bg)", maxWidth: 420, width: "100%", aspectRatio: "1 / 1", overflow: "hidden", padding: 0 }}
            >
              <TrackPlayer key={active!.slug} release={active!} onClose={close} />
            </div>
          ) : (
            <div
              onClick={(event) => event.stopPropagation()}
              className="card"
              style={{ background: "var(--bg)", maxWidth: 420, width: "100%", maxHeight: "85vh", overflowY: "auto", padding: 24, position: "relative" }}
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
                    src={getEmbedUrl(embedService, active.links?.[embedService] || "") || ""}
                    width="100%"
                    height={EMBED_HEIGHT[embedService]}
                    style={{ border: "none", display: "block" }}
                    allow="autoplay; encrypted-media; fullscreen"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                  {SERVICES.filter((service) => active.links?.[service]).map((service) => {
                    const url = active.links![service]!;
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
                  {SERVICES.every((service) => !active.links?.[service]) ? (
                    <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                      Not currently available to stream.
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
