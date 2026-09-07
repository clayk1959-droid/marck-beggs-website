"use client";

import Image from "next/image";
import { useState } from "react";

type StreamingService = "spotify" | "apple" | "youtube" | "pandora" | "soundcloud";

const SERVICES: { key: StreamingService; label: string }[] = [
  { key: "spotify", label: "Spotify" },
  { key: "apple", label: "Apple Music" },
  { key: "youtube", label: "YouTube" },
  { key: "soundcloud", label: "SoundCloud" },
  { key: "pandora", label: "Pandora" },
];

type Release = {
  slug: string;
  title: string;
  year: string;
  credit?: string;
  cover: string;
  links?: Partial<Record<StreamingService, string>>;
  tracks?: { title: string; note?: string; audioUrl: string }[];
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  fontSize: 14,
  border: "2px solid var(--ink)",
  background: "var(--bg)",
  marginTop: 4,
};

function Row({ release, onDeleted, onSaved }: { release: Release; onDeleted: () => void; onSaved: (r: Release) => void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(release.title);
  const [year, setYear] = useState(release.year);
  const [credit, setCredit] = useState(release.credit || "");
  const [links, setLinks] = useState<Partial<Record<StreamingService, string>>>({ ...release.links });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/music", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: release.slug, title, year, credit, links }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Failed to save.");
      return;
    }
    onSaved({ ...release, title, year, credit, links });
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm(`Delete "${release.title}"? This can't be undone.`)) return;
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/music", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: release.slug }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Failed to delete.");
      return;
    }
    onDeleted();
  }

  return (
    <div className="card" style={{ padding: "14px 18px" }}>
      {editing ? (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
              <Image src={release.cover} alt={release.title} fill style={{ objectFit: "cover" }} sizes="64px" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="mono" style={{ fontSize: 11 }}>Title</label>
              <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <label className="mono" style={{ fontSize: 11 }}>Year</label>
              <input style={inputStyle} value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div style={{ flex: 2 }}>
              <label className="mono" style={{ fontSize: 11 }}>Credit</label>
              <input style={inputStyle} value={credit} onChange={(e) => setCredit(e.target.value)} />
            </div>
          </div>

          {release.tracks && release.tracks.length > 0 ? (
            <p className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 10 }}>
              This release plays from its own track list, not streaming links — tracks aren&rsquo;t editable here yet.
            </p>
          ) : (
            <div style={{ marginBottom: 10 }}>
              <label className="mono" style={{ fontSize: 11 }}>Streaming links</label>
              {SERVICES.map(({ key, label }) => (
                <input
                  key={key}
                  style={inputStyle}
                  placeholder={`${label} URL`}
                  value={links[key] || ""}
                  onChange={(e) => setLinks((current) => ({ ...current, [key]: e.target.value }))}
                />
              ))}
            </div>
          )}

          {error ? <p className="mono" style={{ color: "var(--accent)", fontSize: 11 }}>{error}</p> : null}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button type="button" className="btn" disabled={busy} onClick={handleSave} style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}>
              {busy ? "Saving…" : "Save"}
            </button>
            <button type="button" className="btn" disabled={busy} onClick={() => setEditing(false)} style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
            <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
              <Image src={release.cover} alt={release.title} fill style={{ objectFit: "cover" }} sizes="48px" />
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>{release.title}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                {[release.year, release.credit].filter(Boolean).join(" · ")}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button type="button" className="btn" onClick={() => setEditing(true)} style={{ padding: "6px 12px", fontSize: 12 }}>
              Edit
            </button>
            <button type="button" className="btn" disabled={busy} onClick={handleDelete} style={{ padding: "6px 12px", fontSize: 12 }}>
              {busy ? "…" : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MusicReleaseEditor({ initialReleases }: { initialReleases: Release[] }) {
  const [releases, setReleases] = useState(initialReleases);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {releases.map((release) => (
        <Row
          key={release.slug}
          release={release}
          onSaved={(updated) => setReleases((current) => current.map((item) => (item.slug === updated.slug ? updated : item)))}
          onDeleted={() => setReleases((current) => current.filter((item) => item.slug !== release.slug))}
        />
      ))}
      {releases.length === 0 ? <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>None left.</p> : null}
    </div>
  );
}
