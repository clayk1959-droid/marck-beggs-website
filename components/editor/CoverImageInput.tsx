"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";

export function CoverImageInput({ onUploaded }: { onUploaded: (blobUrl: string | null) => void }) {
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      onUploaded(null);
      setFileName(null);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const result = await upload(`editor-uploads/${Date.now()}-${safeName}`, file, {
        access: "private",
        handleUploadUrl: "/api/editor/upload",
      });
      onUploaded(result.url);
      setFileName(file.name);
    } catch {
      setError("Upload failed — try again.");
      onUploaded(null);
      setFileName(null);
    }
    setBusy(false);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} disabled={busy} className="mono" style={{ fontSize: 12 }} />
      {busy ? (
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginLeft: 8 }}>
          uploading…
        </span>
      ) : fileName ? (
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginLeft: 8 }}>
          {fileName} ready
        </span>
      ) : null}
      {error ? (
        <p className="mono" style={{ fontSize: 11, color: "var(--accent)", marginTop: 4 }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
