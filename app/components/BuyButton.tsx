"use client";

import { useState } from "react";

export default function BuyButton({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Ödeme başlatılamadı. Lütfen tekrar deneyin.");
        setLoading(false);
      }
    } catch {
      setError("Bağlantı kurulamadı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  return (
    <div className="buybox">
      <button className="btn" onClick={handleBuy} disabled={loading}>
        {loading ? "Yönlendiriliyor…" : "Satın Al"}
      </button>
      {error && <p className="buybox__error">{error}</p>}
    </div>
  );
}
