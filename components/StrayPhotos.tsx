"use client";

import Image from "next/image";
import { useState } from "react";

const PHOTOS = [
  {
    src: "/images/stray/sirius-guitar.jpg",
    alt: "Marck with Johnny A at Sirius, holding a guitar he won",
    caption: "NYC, June 2004 — won this Johnny A Signature guitar",
  },
  {
    src: "/images/stray/howdy-facemask.jpg",
    alt: "Marck wearing a face mask and tie",
    caption: "Howdy!",
  },
];

export function StrayPhotos() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? PHOTOS[openIndex] : null;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
        {PHOTOS.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            style={{ textAlign: "center", width: 160, background: "none", border: "none", cursor: "zoom-in", padding: 0 }}
          >
            <div className="card" style={{ overflow: "hidden", position: "relative", width: "100%", aspectRatio: "4 / 5" }}>
              <Image src={photo.src} alt={photo.alt} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="160px" />
            </div>
            <p className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 8 }}>
              {photo.caption}
            </p>
          </button>
        ))}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
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
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#fff", fontSize: 28, lineHeight: 1, cursor: "pointer", padding: 8 }}
          >
            ×
          </button>

          {openIndex! > 0 ? (
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(event) => {
                event.stopPropagation();
                setOpenIndex((current) => Math.max(0, (current ?? 0) - 1));
              }}
              style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 40, lineHeight: 1, cursor: "pointer", padding: 12 }}
            >
              ‹
            </button>
          ) : null}

          <div onClick={(event) => event.stopPropagation()} style={{ position: "relative", width: "100%", maxWidth: 600, maxHeight: "80vh", aspectRatio: "3 / 4" }}>
            <Image src={open.src} alt={open.alt} fill style={{ objectFit: "contain" }} sizes="100vw" priority />
          </div>

          {openIndex! < PHOTOS.length - 1 ? (
            <button
              type="button"
              aria-label="Next photo"
              onClick={(event) => {
                event.stopPropagation();
                setOpenIndex((current) => Math.min(PHOTOS.length - 1, (current ?? 0) + 1));
              }}
              style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 40, lineHeight: 1, cursor: "pointer", padding: 12 }}
            >
              ›
            </button>
          ) : null}

          <p className="mono" style={{ color: "#d8d8d8", fontSize: 12, marginTop: 16, textAlign: "center" }}>
            {open.caption}
          </p>
        </div>
      ) : null}
    </>
  );
}
