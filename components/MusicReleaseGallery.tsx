"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { getEmbedUrl, SERVICE_LABELS, StreamingService } from "../lib/streaming-embed";
import { ServiceIcon } from "../lib/service-icons";

type Track = { title: string; note?: string; audioUrl?: string; externalUrl?: string };

type Release = {
  slug: string;
  title: string;
  year: string;
  credit?: string;
  cover: string;
  links?: Record<StreamingService, string>;
  tracks?: Track[];
};

const SERVICES: StreamingService[] = ["pandora", "spotify", "apple", "youtube", "soundcloud"];

const EMBED_HEIGHT: Record<StreamingService, number> = {
  spotify: 152,
  apple: 175,
  youtube: 220,
  soundcloud: 166,
  pandora: 0,
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function TrackPlayer({ release, onClose }: { release: Release; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const tracks = release.tracks || [];
  const currentTrack = currentIndex !== null ? tracks[currentIndex] : null;
  const playableIndexes = tracks.reduce<number[]>((acc, track, index) => {
    if (track.audioUrl) acc.push(index);
    return acc;
  }, []);

  useEffect(() => {
    if (currentIndex !== null) {
      setCurrentTime(0);
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

  function playAdjacent(direction: 1 | -1) {
    if (currentIndex === null) return;
    if (direction === -1 && currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      return;
    }
    const pos = playableIndexes.indexOf(currentIndex);
    const nextPos = pos + direction;
    if (nextPos >= 0 && nextPos < playableIndexes.length) {
      setCurrentIndex(playableIndexes[nextPos]);
    } else if (direction === -1 && audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  function handleScrub(value: number) {
    if (audioRef.current) audioRef.current.currentTime = value;
    setCurrentTime(value);
  }

  const hasPrev = currentIndex !== null && playableIndexes.indexOf(currentIndex) > 0;
  const hasNext = currentIndex !== null && playableIndexes.indexOf(currentIndex) < playableIndexes.length - 1;

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
        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingRight: 30 }}>
          <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0, border: "2px solid var(--ink)", boxShadow: "2px 3px 0 rgba(36,27,46,0.28)" }}>
            <Image src={release.cover} alt="" fill style={{ objectFit: "cover" }} sizes="56px" />
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: 18, color: "var(--accent)", textShadow: "2px 2px 0 var(--ink)", lineHeight: 1.2 }}>{release.title}</h3>
            <p className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
              {[release.year, release.credit].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", marginTop: 8, display: "flex", flexDirection: "column" }}>
          {embedUrl ? (
            <div>
              <button
                type="button"
                onClick={() => setEmbedUrl(null)}
                className="mono"
                style={{ fontSize: 12, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: "4px 6px", marginBottom: 10 }}
              >
                ← back
              </button>
              <iframe
                src={embedUrl}
                width="100%"
                height={166}
                style={{ border: "none", display: "block" }}
                allow="autoplay; encrypted-media; fullscreen"
                loading="lazy"
              />
            </div>
          ) : (
          tracks.map((track, index) => {
            const isCurrent = index === currentIndex;
            const playable = Boolean(track.audioUrl);
            const linkable = Boolean(track.externalUrl);
            const active = playable || linkable;
            const rowContent = (
              <>
                <span style={{ fontSize: 13, color: active ? (isCurrent ? "var(--accent)" : "var(--ink)") : "var(--ink-soft)", width: 16, flexShrink: 0 }}>
                  {linkable ? "↗" : playable ? (isCurrent && isPlaying ? "❚❚" : "▶") : "—"}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ fontWeight: isCurrent ? 800 : 600, fontSize: 14, display: "block", color: active ? "var(--ink)" : "var(--ink-soft)" }}>
                    {track.title}
                  </span>
                  {track.note ? (
                    <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>
                      {track.note}
                    </span>
                  ) : null}
                </span>
              </>
            );
            const rowStyle: CSSProperties = {
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "4px 6px",
              background: isCurrent ? "rgba(36,27,46,0.08)" : "none",
              border: "none",
              textAlign: "left",
              textDecoration: "none",
              color: "inherit",
            };
            if (linkable) {
              const embeddable = getEmbedUrl("soundcloud", track.externalUrl!);
              if (embeddable) {
                return (
                  <button key={track.title} type="button" onClick={() => setEmbedUrl(embeddable)} style={{ ...rowStyle, cursor: "pointer" }}>
                    {rowContent}
                  </button>
                );
              }
              return (
                <a key={track.title} href={track.externalUrl} target="_blank" rel="noreferrer" style={{ ...rowStyle, cursor: "pointer" }}>
                  {rowContent}
                </a>
              );
            }
            if (!playable) {
              return (
                <div key={track.title} style={rowStyle}>
                  {rowContent}
                </div>
              );
            }
            return (
              <button key={track.title} type="button" onClick={() => handleTrackClick(index)} style={{ ...rowStyle, cursor: "pointer" }}>
                {rowContent}
              </button>
            );
          })
          )}
        </div>

        {currentTrack ? (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "2px solid var(--ink)" }}>
            <audio
              ref={audioRef}
              src={currentTrack.audioUrl}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleEnded}
              style={{ display: "none" }}
            />

            <div className="mono" style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {currentTrack.title}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", width: 32, flexShrink: 0 }}>
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={(e) => handleScrub(Number(e.target.value))}
                style={{ flex: 1, accentColor: "var(--accent)" }}
                aria-label="Seek"
              />
              <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", width: 32, flexShrink: 0, textAlign: "right" }}>
                {formatTime(duration)}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 8 }}>
              <button
                type="button"
                onClick={() => playAdjacent(-1)}
                aria-label="Previous track"
                disabled={!hasPrev && currentTime <= 3}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: hasPrev || currentTime > 3 ? "var(--ink)" : "var(--ink-soft)",
                  padding: 4,
                }}
              >
                ⏮
              </button>
              <button
                type="button"
                onClick={() => handleTrackClick(currentIndex!)}
                aria-label={isPlaying ? "Pause" : "Play"}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "2px solid var(--ink)",
                  boxShadow: "3px 4px 0 rgba(36,27,46,0.28)",
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>
              <button
                type="button"
                onClick={() => playAdjacent(1)}
                aria-label="Next track"
                disabled={!hasNext}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: hasNext ? "var(--ink)" : "var(--ink-soft)",
                  padding: 4,
                }}
              >
                ⏭
              </button>
            </div>
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
              const availableServices = SERVICES.filter((service) => release.links?.[service]);
              setEmbedService(availableServices.length === 1 ? availableServices[0] : null);
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
            <div style={{ padding: "8px 10px", textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{release.title}</div>
              {release.year ? (
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                  {release.year}
                </div>
              ) : null}
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
              style={{ background: "#fff", maxWidth: 420, width: "100%", maxHeight: "85vh", overflowY: "auto", padding: 24, position: "relative" }}
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
                    onClick={() => {
                      const availableServices = SERVICES.filter((service) => active.links?.[service]);
                      if (availableServices.length === 1) close();
                      else setEmbedService(null);
                    }}
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 16 }}>
                  {SERVICES.filter((service) => active.links?.[service]).map((service) => {
                    const url = active.links![service]!;
                    const embeddable = Boolean(getEmbedUrl(service, url));
                    const content = (
                      <>
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(36,27,46,0.2)",
                            borderRadius: 6,
                          }}
                        >
                          <ServiceIcon service={service} variant="color" size={36} />
                        </div>
                        <span className="mono" style={{ fontSize: 11, color: "var(--ink)" }}>
                          {SERVICE_LABELS[service]}
                          {embeddable ? "" : " ↗"}
                        </span>
                      </>
                    );
                    const itemStyle: CSSProperties = {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "10px 4px",
                      background: "none",
                      border: "none",
                      textDecoration: "none",
                      cursor: "pointer",
                    };
                    if (embeddable) {
                      return (
                        <button key={service} type="button" onClick={() => setEmbedService(service)} style={itemStyle}>
                          {content}
                        </button>
                      );
                    }
                    return (
                      <a key={service} href={url} target="_blank" rel="noreferrer" style={itemStyle}>
                        {content}
                      </a>
                    );
                  })}
                  {SERVICES.every((service) => !active.links?.[service]) ? (
                    <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", gridColumn: "1 / -1" }}>
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
