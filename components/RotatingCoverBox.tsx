"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CoverItem = { image: string; label?: string };

export function RotatingCoverBox({ images }: { images: CoverItem[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIndex((current) => (current + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images.length]);

  const current = images[index];
  if (!current) return null;

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#fff" }}>
      <Image key={current.image} src={current.image} alt={current.label || ""} fill style={{ objectFit: "cover" }} sizes="(min-width: 640px) 320px, 45vw" />
    </div>
  );
}
