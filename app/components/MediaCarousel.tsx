"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/lib/products";

export default function MediaCarousel({
  items,
  label,
  tall = false,
}: {
  items: MediaItem[];
  label: string;
  tall?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const current = items[idx];

  return (
    <div className="carousel">
      <div className={`imgpanel ${tall ? "imgpanel--tall" : ""}`}>
        {current.type === "image" ? (
          <Image
            src={current.src}
            alt={`${label} ${idx + 1}`}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <video
            src={current.src}
            controls
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        {items.length > 1 && (
          <>
            <button
              className="carousel__prev"
              onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
              aria-label="Önceki"
            >
              ‹
            </button>
            <button
              className="carousel__next"
              onClick={() => setIdx((i) => (i + 1) % items.length)}
              aria-label="Sonraki"
            >
              ›
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="carousel__dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot${i === idx ? " is-active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`${i + 1}. medya`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
