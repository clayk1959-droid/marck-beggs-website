"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// How long the "Saved" confirmation stays up before the row collapses.
// Saving used to collapse the (tall) edit form instantly, which yanked
// everything below it up the page right as you might click the next
// thing -- long enough to misfire onto a different row entirely. This
// pause keeps the layout stable while it's fresh, and the row confirms
// its own title so a mistaken click before the collapse is obvious.
const SAVE_CONFIRMATION_MS = 1400;
import { CoverImageInput } from "./CoverImageInput";

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
  tracks?: { title: string; note?: string; audioUrl?: string }[];
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
  const [coverBlobUrl, setCoverBlobUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const collapseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
  }, []);

  async function handleSave() {
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/music", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: release.slug, title, year, credit, links, coverBlobUrl: coverBlobUrl || undefined }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Failed to save.");
      return;
    }
    const data = await response.json();
    onSaved(data.release);
    setJustSaved(true);
    collapseTimeout.current = setTimeout(() => {
      setJustSaved(false);
      setEditing(false);
    }, SAVE_CONFIRMATION_MS);
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
          <div style={{ marginBottom: 10 }}>
            <label className="mono" style={{ fontSize: 11 }}>Replace cover image</label>
            <div style={{ marginTop: 4 }}>
              <CoverImageInput onUploaded={setCoverBlobUrl} />
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
          {justSaved ? (
            <p className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginTop: 4 }}>
              ✓ Saved &ldquo;{title}&rdquo;
            </p>
          ) : (
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button type="button" className="btn" disabled={busy} onClick={handleSave} style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}>
                {busy ? "Saving…" : "Save"}
              </button>
              <button type="button" className="btn" disabled={busy} onClick={() => setEditing(false)} style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}>
                Cancel
              </button>
            </div>
          )}
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

function AddReleaseForm({ onAdded }: { onAdded: (r: Release) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [credit, setCredit] = useState("");
  const [links, setLinks] = useState<Partial<Record<StreamingService, string>>>({});
  const [coverBlobUrl, setCoverBlobUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const collapseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
  }, []);

  function reset() {
    setTitle("");
    setYear("");
    setCredit("");
    setLinks({});
    setCoverBlobUrl(null);
    setError(null);
  }

  async function handleAdd() {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!coverBlobUrl) {
      setError("Choose a cover image first.");
      return;
    }
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/music", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, year, credit, coverBlobUrl, ...links }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Failed to add.");
      return;
    }
    const data = await response.json();
    onAdded(data.release);
    setJustAdded(title);
    collapseTimeout.current = setTimeout(() => {
      setJustAdded(null);
      reset();
      setOpen(false);
    }, SAVE_CONFIRMATION_MS);
  }

  if (!open) {
    return (
      <button type="button" className="btn" onClick={() => setOpen(true)} style={{ padding: "10px 16px", fontSize: 13 }}>
        + Add a release
      </button>
    );
  }

  return (
    <div className="card" style={{ padding: "14px 18px" }}>
      <div style={{ marginBottom: 10 }}>
        <label className="mono" style={{ fontSize: 11 }}>Title</label>
        <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Album or single title" />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label className="mono" style={{ fontSize: 11 }}>Cover image</label>
        <div style={{ marginTop: 4 }}>
          <CoverImageInput onUploaded={setCoverBlobUrl} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <label className="mono" style={{ fontSize: 11 }}>Year</label>
          <input style={inputStyle} value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div style={{ flex: 2 }}>
          <label className="mono" style={{ fontSize: 11 }}>Credit (band/artist)</label>
          <input style={inputStyle} value={credit} onChange={(e) => setCredit(e.target.value)} />
        </div>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label className="mono" style={{ fontSize: 11 }}>
          Streaming links — one turns the cover into a direct mini-player, more than one shows a picker
        </label>
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
      {error ? <p className="mono" style={{ color: "var(--accent)", fontSize: 11 }}>{error}</p> : null}
      {justAdded ? (
        <p className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginTop: 4 }}>
          ✓ Added &ldquo;{justAdded}&rdquo;
        </p>
      ) : (
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button type="button" className="btn" disabled={busy} onClick={handleAdd} style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}>
            {busy ? "Adding…" : "Add release"}
          </button>
          <button
            type="button"
            className="btn"
            disabled={busy}
            onClick={() => {
              reset();
              setOpen(false);
            }}
            style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export function MusicReleaseEditor({ initialReleases }: { initialReleases: Release[] }) {
  const [releases, setReleases] = useState(initialReleases);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <AddReleaseForm onAdded={(added) => setReleases((current) => [...current, added])} />
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
