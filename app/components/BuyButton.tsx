"use client";

import { useState } from "react";
import PreorderModal from "./PreorderModal";

export default function BuyButton({ slug, preorder, productName }: { slug: string; preorder?: boolean; productName?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function handleBuy() {
    if (preorder) {
      setShowModal(true);
      return;
    }
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
    <>
      <div className="buybox">
        <button className="btn" onClick={handleBuy} disabled={loading}>
          {loading ? "Yönlendiriliyor…" : preorder ? "Ön Sipariş Ver" : "Satın Al"}
        </button>
        {error && <p className="buybox__error">{error}</p>}
      </div>
      {showModal && (
        <PreorderModal
          productName={productName ?? slug}
          productSlug={slug}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
