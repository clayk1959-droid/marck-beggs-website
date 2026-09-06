"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CoverItem = { image: string; label?: string };

const FADE_MS = 350;

export function RotatingCoverBox({
  images,
  intervalMs = 3500,
  startDelayMs = intervalMs,
}: {
  images: CoverItem[];
  intervalMs?: number;
  startDelayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;

    function scheduleNext(delay: number) {
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        fadeTimeoutRef.current = setTimeout(() => {
          setIndex((current) => (current + 1) % images.length);
          setVisible(true);
        }, FADE_MS);
        scheduleNext(intervalMs);
      }, delay);
    }

    scheduleNext(startDelayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [images.length, intervalMs, startDelayMs]);

  const current = images[index];
  if (!current) return null;

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#fff" }}>
      <Image
        src={current.image}
        alt={current.label || ""}
        fill
        style={{ objectFit: "cover", opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
        sizes="(min-width: 640px) 320px, 45vw"
      />
    </div>
  );
}
