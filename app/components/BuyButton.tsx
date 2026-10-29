"use client";

import { useState } from "react";
import StokBildirimModal from "./PreorderModal";

export default function BuyButton({
  slug,
  inStock,
  productName,
}: {
  slug: string;
  inStock?: boolean;
  productName?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const preRegisterEnabled = process.env.NEXT_PUBLIC_PREREGISTER_ENABLED !== "false";

  if (!inStock) {
    if (preRegisterEnabled) {
      return (
        <>
          <div className="buybox">
            <button className="btn" onClick={() => setShowModal(true)}>
              Stoğa Girince Haber Ver
            </button>
          </div>
          {showModal && (
            <StokBildirimModal
              productName={productName ?? slug}
              productSlug={slug}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      );
    }
    return (
      <div className="buybox">
        <p className="buybox__unavailable">Şu an stokta yok.</p>
      </div>
    );
  }

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
