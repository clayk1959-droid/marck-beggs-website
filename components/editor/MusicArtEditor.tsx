"use client";

import Image from "next/image";
import { useState } from "react";

type ArtItem = { image: string; label: string };

function Row({ item, onDeleted, onSaved }: { item: ArtItem; onDeleted: () => void; onSaved: (item: ArtItem) => void }) {
  const [label, setLabel] = useState(item.label);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/music", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: item.image, label }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Failed to save.");
      return;
    }
    onSaved({ image: item.image, label });
  }

  async function handleDelete() {
    if (!confirm("Delete this cover art image? This can't be undone.")) return;
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/music", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: item.image }),
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
    <div className="card" style={{ padding: 10 }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
        <Image src={item.image} alt={label || "cover art"} fill style={{ objectFit: "cover" }} sizes="140px" />
      </div>
      <input
        value={label}
        placeholder="label (optional)"
        onChange={(event) => setLabel(event.target.value)}
        style={{ width: "100%", marginTop: 8, padding: "6px 8px", fontSize: 12, border: "2px solid var(--ink)", background: "var(--bg)" }}
      />
      {error ? <p className="mono" style={{ color: "var(--accent)", fontSize: 10, marginTop: 4 }}>{error}</p> : null}
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <button type="button" className="btn" disabled={busy} onClick={handleSave} style={{ flex: 1, padding: "6px 8px", fontSize: 11 }}>
          Save
        </button>
        <button type="button" className="btn" disabled={busy} onClick={handleDelete} style={{ flex: 1, padding: "6px 8px", fontSize: 11 }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export function MusicArtEditor({ initialItems }: { initialItems: ArtItem[] }) {
  const [items, setItems] = useState(initialItems);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14 }}>
      {items.map((item) => (
        <Row
          key={item.image}
          item={item}
          onSaved={(updated) => setItems((current) => current.map((entry) => (entry.image === updated.image ? updated : entry)))}
          onDeleted={() => setItems((current) => current.filter((entry) => entry.image !== item.image))}
        />
      ))}
      {items.length === 0 ? <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>No art left.</p> : null}
    </div>
  );
}
