"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CoverItem = { image: string; label?: string };

const FADE_MS = 600;

export function RotatingCoverBox({
  images,
  intervalMs = 4500,
  startDelayMs = intervalMs,
}: {
  images: CoverItem[];
  intervalMs?: number;
  startDelayMs?: number;
}) {
  const [slotA, setSlotA] = useState(0);
  const [slotB, setSlotB] = useState(images.length > 1 ? 1 : 0);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");

  // Refs mirror the latest slot values so the scheduler's closure (created
  // once, on mount) always reads the current state instead of a stale one.
  const slotARef = useRef(slotA);
  const slotBRef = useRef(slotB);
  slotARef.current = slotA;
  slotBRef.current = slotB;

  useEffect(() => {
    if (images.length <= 1) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    function scheduleNext(delay: number) {
      timeoutId = setTimeout(() => {
        setActiveSlot((currentActive) => {
          const shownIndex = currentActive === "a" ? slotARef.current : slotBRef.current;
          const nextIndex = (shownIndex + 1) % images.length;
          if (currentActive === "a") {
            setSlotB(nextIndex);
            return "b";
          }
          setSlotA(nextIndex);
          return "a";
        });
        scheduleNext(intervalMs);
      }, delay);
    }

    scheduleNext(startDelayMs);
    return () => clearTimeout(timeoutId);
  }, [images.length, intervalMs, startDelayMs]);

  const itemA = images[slotA];
  const itemB = images[slotB];

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
      {itemA ? (
        <Image
          src={itemA.image}
          alt={itemA.label || ""}
          fill
          style={{ objectFit: "cover", opacity: activeSlot === "a" ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
          sizes="(min-width: 640px) 320px, 45vw"
        />
      ) : null}
      {itemB && images.length > 1 ? (
        <Image
          src={itemB.image}
          alt={itemB.label || ""}
          fill
          style={{ objectFit: "cover", opacity: activeSlot === "b" ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
          sizes="(min-width: 640px) 320px, 45vw"
        />
      ) : null}
    </div>
  );
}
