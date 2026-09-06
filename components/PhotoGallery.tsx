"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { PhotoGroup } from "../lib/photo-collection";
import { flattenGroups } from "../lib/photo-collection";

export function PhotoGallery({ slug, groups }: { slug: string; groups: PhotoGroup[] }) {
  const photos = flattenGroups(groups);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const goPrev = useCallback(() => {
    setOpenIndex((current) => (current === null ? null : (current - 1 + photos.length) % photos.length));
  }, [photos.length]);
  const goNext = useCallback(() => {
    setOpenIndex((current) => (current === null ? null : (current + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, goPrev, goNext]);

  return (
    <>
      {groups.map((group) => (
        <div key={group.place} style={{ marginBottom: 36 }}>
          <h3
            className="mono"
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--ink-soft)",
              marginBottom: 12,
            }}
          >
            {group.place}
          </h3>
          <div className="photo-grid">
            {group.photos.map((basename) => {
              const photo = photos.find((p) => p.basename === basename)!;
              return (
                <button
                  key={basename}
                  type="button"
                  onClick={() => setOpenIndex(photo.index)}
                  className="card"
                  style={{ overflow: "hidden", padding: 0, border: "3px solid var(--ink)", cursor: "zoom-in", background: "none" }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
                    <Image
                      src={`/gallery/${slug}/thumbs/${basename}.jpg`}
                      alt={`${group.place} photo`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(min-width: 640px) 220px, 45vw"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 28,
              lineHeight: 1,
              cursor: "pointer",
              padding: 8,
            }}
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            style={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 40,
              lineHeight: 1,
              cursor: "pointer",
              padding: 12,
            }}
          >
            ‹
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 1000,
              maxHeight: "80vh",
              aspectRatio: "3 / 2",
            }}
          >
            <Image
              src={`/gallery/${slug}/full/${photos[openIndex].basename}.jpg`}
              alt={photos[openIndex].place}
              fill
              style={{ objectFit: "contain" }}
              sizes="100vw"
              priority
            />
          </div>

          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 40,
              lineHeight: 1,
              cursor: "pointer",
              padding: 12,
            }}
          >
            ›
          </button>

          <p className="mono" style={{ color: "#d8d8d8", fontSize: 12, marginTop: 16, textAlign: "center" }}>
            {photos[openIndex].place} — {openIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
