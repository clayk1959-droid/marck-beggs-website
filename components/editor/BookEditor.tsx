"use client";

import { useState } from "react";
import { CoverImageInput } from "./CoverImageInput";

type Book = { id: string; title: string; year?: string; publisher?: string; note?: string; cover: string; buyUrl?: string };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  fontSize: 14,
  border: "2px solid var(--ink)",
  background: "var(--bg)",
  marginTop: 4,
};

const FIELDS: { key: keyof Book; label: string }[] = [
  { key: "title", label: "Title" },
  { key: "year", label: "Year" },
  { key: "publisher", label: "Publisher" },
  { key: "note", label: "Note" },
  { key: "buyUrl", label: "Buy URL" },
];

function Row({ book, list, onDeleted, onSaved }: { book: Book; list: "collections" | "anthologies"; onDeleted: () => void; onSaved: (b: Book) => void }) {
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({ ...book });
  const [coverBlobUrl, setCoverBlobUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/books", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, list, coverBlobUrl: coverBlobUrl || undefined }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Failed to save.");
      return;
    }
    const data = await response.json();
    onSaved(data.book);
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm(`Delete "${book.title}"? This can't be undone.`)) return;
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: book.id, list }),
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
          <div style={{ marginBottom: 10 }}>
            <label className="mono" style={{ fontSize: 11 }}>Replace cover image</label>
            <div style={{ marginTop: 4 }}>
              <CoverImageInput onUploaded={setCoverBlobUrl} />
            </div>
          </div>
          {FIELDS.map(({ key, label }) => (
            <div key={key} style={{ marginBottom: 10 }}>
              <label className="mono" style={{ fontSize: 11 }}>{label}</label>
              <input
                style={inputStyle}
                value={fields[key] || ""}
                onChange={(event) => setFields((current) => ({ ...current, [key]: event.target.value }))}
              />
            </div>
          ))}
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
          <div>
            <div style={{ fontWeight: 700 }}>{book.title}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
              {[book.year, book.publisher, book.note].filter(Boolean).join(" · ")}
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

function AddBookForm({ list, onAdded }: { list: "collections" | "anthologies"; onAdded: (b: Book) => void }) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({ title: "", year: "", publisher: "", note: "", buyUrl: "" });
  const [coverBlobUrl, setCoverBlobUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setFields({ title: "", year: "", publisher: "", note: "", buyUrl: "" });
    setCoverBlobUrl(null);
    setError(null);
  }

  async function handleAdd() {
    if (!fields.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!coverBlobUrl) {
      setError("Choose a cover image first.");
      return;
    }
    setBusy(true);
    setError(null);
    const response = await fetch("/api/editor/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, list, coverBlobUrl }),
    });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Failed to add.");
      return;
    }
    const data = await response.json();
    onAdded(data.book);
    reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <button type="button" className="btn" onClick={() => setOpen(true)} style={{ padding: "10px 16px", fontSize: 13 }}>
        + Add a book
      </button>
    );
  }

  return (
    <div className="card" style={{ padding: "14px 18px" }}>
      <div style={{ marginBottom: 10 }}>
        <label className="mono" style={{ fontSize: 11 }}>Cover image</label>
        <div style={{ marginTop: 4 }}>
          <CoverImageInput onUploaded={setCoverBlobUrl} />
        </div>
      </div>
      {FIELDS.map(({ key, label }) => (
        <div key={key} style={{ marginBottom: 10 }}>
          <label className="mono" style={{ fontSize: 11 }}>{label}</label>
          <input
            style={inputStyle}
            value={fields[key] || ""}
            onChange={(event) => setFields((current) => ({ ...current, [key]: event.target.value }))}
          />
        </div>
      ))}
      {error ? <p className="mono" style={{ color: "var(--accent)", fontSize: 11 }}>{error}</p> : null}
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button type="button" className="btn" disabled={busy} onClick={handleAdd} style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}>
          {busy ? "Adding…" : "Add book"}
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
    </div>
  );
}

export function BookEditor({ list, initialBooks }: { list: "collections" | "anthologies"; initialBooks: Book[] }) {
  const [books, setBooks] = useState(initialBooks);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <AddBookForm list={list} onAdded={(added) => setBooks((current) => [...current, added])} />
      {books.map((book) => (
        <Row
          key={book.id}
          book={book}
          list={list}
          onSaved={(updated) => setBooks((current) => current.map((item) => (item.id === updated.id ? updated : item)))}
          onDeleted={() => setBooks((current) => current.filter((item) => item.id !== book.id))}
        />
      ))}
      {books.length === 0 ? <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>None left.</p> : null}
    </div>
  );
}
