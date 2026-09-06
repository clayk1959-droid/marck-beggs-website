"use client";

import { useState } from "react";

type Collection = { slug: string; title: string; subtitle: string; cover: string; photos: string[] };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  fontSize: 14,
  border: "2px solid var(--ink)",
  background: "var(--bg)",
  marginTop: 4,
};

function Row({ collection, onDeleted, onSaved }: { collection: Collection; onDeleted: () => void; onSaved: (c: Collection) => void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(collection.title);
  const [subtitle, setSubtitle] = useState(collection.subtitle);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/photos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: collection.slug, title, subtitle }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Failed to save.");
      return;
    }
    onSaved({ ...collection, title, subtitle });
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm(`Delete the "${collection.title}" collection and all ${collection.photos.length} photos? This can't be undone.`)) return;
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: collection.slug }),
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
          <label className="mono" style={{ fontSize: 11 }}>Title</label>
          <input style={inputStyle} value={title} onChange={(event) => setTitle(event.target.value)} />
          <label className="mono" style={{ fontSize: 11, marginTop: 10, display: "block" }}>Subtitle</label>
          <input style={inputStyle} value={subtitle} onChange={(event) => setSubtitle(event.target.value)} />
          {error ? <p className="mono" style={{ color: "var(--accent)", fontSize: 11, marginTop: 8 }}>{error}</p> : null}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
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
          <div>
            <div style={{ fontWeight: 700 }}>{collection.title}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
              {collection.subtitle} · {collection.photos.length} photos
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

export function PhotoCollectionEditor({ initialCollections }: { initialCollections: Collection[] }) {
  const [collections, setCollections] = useState(initialCollections);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p className="mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
        Changes commit directly and go live once the site rebuilds (usually under a minute).
      </p>
      {collections.map((collection) => (
        <Row
          key={collection.slug}
          collection={collection}
          onSaved={(updated) => setCollections((current) => current.map((item) => (item.slug === updated.slug ? updated : item)))}
          onDeleted={() => setCollections((current) => current.filter((item) => item.slug !== collection.slug))}
        />
      ))}
      {collections.length === 0 ? <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>No collections left.</p> : null}
    </div>
  );
}
