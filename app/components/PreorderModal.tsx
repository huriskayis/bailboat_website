"use client";

import { useState, useEffect } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function PreorderModal({ productName, onClose }: { productName: string; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", quantity: "1", message: "" });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateQuantity(value: string) {
    const digits = value.replace(/\D/g, "");
    setForm((f) => ({ ...f, quantity: digits }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const qty = parseInt(form.quantity, 10);
    const quantityLine = qty > 1 ? `\nAdet: ${qty}` : "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `[Ön Sipariş — ${productName}]${quantityLine}\n${form.message}` }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="preorder-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="preorder-modal">
        <button className="preorder-modal__close" onClick={onClose} aria-label="Kapat">✕</button>

        {status === "sent" ? (
          <div className="form-done">
            <p className="eyebrow">Talebiniz alındı</p>
            <p className="form-done__text">
              Size bir onay maili gönderdik. Teslimat tarihi ve ödeme detayları için en kısa sürede dönüş yapacağız.
            </p>
          </div>
        ) : (
          <>
            <div className="preorder-modal__head">
              <p className="eyebrow">Ön Sipariş</p>
              <h2 className="preorder-modal__title">{productName}</h2>
              <p className="preorder-modal__desc">
                Formu doldurun, sizi arayalım. Teslimat tarihi ve ödeme detaylarını birlikte netleştiririz — şimdi ödeme yapmanıza gerek yok.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="po-name">Ad Soyad</label>
                <input
                  id="po-name" type="text" required
                  value={form.name} onChange={(e) => update("name", e.target.value)}
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div className="field">
                <label htmlFor="po-quantity">Adet</label>
                <input
                  id="po-quantity" type="text" inputMode="numeric" required
                  value={form.quantity}
                  onChange={(e) => updateQuantity(e.target.value)}
                  style={{ maxWidth: "8rem" }}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="po-phone">Telefon</label>
                  <input
                    id="po-phone" type="tel" required
                    value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    placeholder="+90 5xx xxx xx xx"
                  />
                </div>
                <div className="field">
                  <label htmlFor="po-email">E-posta</label>
                  <input
                    id="po-email" type="email"
                    value={form.email} onChange={(e) => update("email", e.target.value)}
                    placeholder="ornek@eposta.com"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="po-message">Notunuz <span style={{ fontWeight: 300, opacity: 0.6 }}>(isteğe bağlı)</span></label>
                <textarea
                  id="po-message" rows={3}
                  value={form.message} onChange={(e) => update("message", e.target.value)}
                  placeholder="Özel bir talebiniz veya sorunuz varsa buraya yazabilirsiniz."
                />
              </div>
              <div className="contact-form__foot">
                <button className="btn" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Gönderiliyor…" : "Ön Sipariş Talebi Gönder"}
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
