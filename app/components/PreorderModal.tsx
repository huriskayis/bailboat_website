"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Status = "idle" | "sending" | "sent" | "error";

export default function StokBildirimModal({
  productName,
  productSlug,
  onClose,
}: {
  productName: string;
  productSlug: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message: `[Stok Bildirimi — ${productName}] Stoğa girince haberdar etmenizi istiyorum.`,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  void productSlug;

  return (
    <div className="preorder-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="preorder-modal">
        <button className="preorder-modal__close" onClick={onClose} aria-label="Kapat">✕</button>

        {status === "sent" ? (
          <div className="form-done">
            <p className="eyebrow">Kaydınız alındı</p>
            <p className="form-done__text">
              {productName} stoka girdiğinde sizi bilgilendireceğiz.
            </p>
          </div>
        ) : (
          <>
            <div className="preorder-modal__head">
              <p className="eyebrow">Stok Bildirimi</p>
              <h2 className="preorder-modal__title">{productName}</h2>
              <p className="preorder-modal__desc">
                Ön kayıt ücretsizdir. Ödeme alınmaz, kart bilgisi istenmez,
                satın alma yükümlülüğü doğmaz. Ürün stoğa girdiğinde sizi
                bilgilendiririz; satın alma sitemiz üzerinden normal sipariş
                ile yapılır.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="sb-name">Ad Soyad</label>
                <input
                  id="sb-name" type="text" required
                  value={form.name} onChange={(e) => update("name", e.target.value)}
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="sb-phone">Telefon</label>
                  <input
                    id="sb-phone" type="tel" required
                    value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    placeholder="+90 5xx xxx xx xx"
                  />
                </div>
                <div className="field">
                  <label htmlFor="sb-email">E-posta</label>
                  <input
                    id="sb-email" type="email" required
                    value={form.email} onChange={(e) => update("email", e.target.value)}
                    placeholder="ornek@eposta.com"
                  />
                </div>
              </div>
              <div className="field">
                <label className="field__checkbox" style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    style={{ marginTop: "0.2rem", flexShrink: 0 }}
                  />
                  <span style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                    Stok bildirimi için benimle e-posta, telefon veya WhatsApp üzerinden
                    iletişime geçilmesine izin veriyorum.{" "}
                    (<Link href="/kvkk-aydinlatma" target="_blank">KVKK Aydınlatma Metni</Link>)
                  </span>
                </label>
              </div>
              <div className="contact-form__foot">
                <button className="btn" type="submit" disabled={status === "sending" || !consent}>
                  {status === "sending" ? "Gönderiliyor…" : "Stoğa Girince Haber Ver"}
                </button>
                {status === "error" && (
                  <p className="buybox__error">Gönderilemedi, lütfen tekrar deneyin.</p>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
