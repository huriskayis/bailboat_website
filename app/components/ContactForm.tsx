"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done">
        <p className="eyebrow">Teşekkürler</p>
        <p className="form-done__text">
          Mesajınız bize ulaştı. Atölyemizden en kısa sürede size dönüş yapılacak.
        </p>
        <button className="link-brass" onClick={() => setStatus("idle")}>
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Ad Soyad</label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Adınız ve soyadınız"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="email">E-posta</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="ornek@eposta.com"
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Telefon</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+90 5xx xxx xx xx"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Mesajınız</label>
        <textarea
          id="message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="İlgilendiğiniz model ve talebiniz hakkında birkaç satır."
        />
      </div>

      <div className="contact-form__foot">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Gönderiliyor…" : "Gönder"}
        </button>
        {status === "error" && (
          <p className="buybox__error">Mesaj gönderilemedi. Lütfen tekrar deneyin.</p>
        )}
      </div>
    </form>
  );
}
