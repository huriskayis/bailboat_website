"use client";

import { useState, useRef, useEffect, lazy, Suspense } from "react";
import type { HaritaNokta } from "./GolHaritasi";

const GolHaritasi = lazy(() => import("./GolHaritasi"));

type Role = "user" | "assistant";
type Message = { role: Role; content: string };
type GolKonum = { lat: number; lng: number };
type MapData = { noktalar: HaritaNokta[] };

const HEDEF_BALIK = ["Sazan", "Yayın Balığı", "Turna", "Çipura / Levrek (baraj)", "Diğer"];
const HAVA = ["Açık ve güneşli", "Parçalı bulutlu", "Kapalı / bulutlu", "Yağmurlu", "Rüzgarlı"];
const SU_SICAKLIGI = ["Soğuk (10°C altı)", "Serin (10–15°C)", "Ilık (15–22°C)", "Sıcak (22°C üzeri)"];

function buildFirstMessage(form: {
  gol: string; hedef: string; hava: string; su: string; notlar: string;
}) {
  return `Göl/Nehir: ${form.gol}
Hedef balık: ${form.hedef}
Hava: ${form.hava}
Su sıcaklığı: ${form.su}${form.notlar ? `\nEk bilgi: ${form.notlar}` : ""}

Bugün nereye yem bırakmalıyım ve nasıl bir strateji izlemeliyim?`;
}

function parseMapData(text: string): { clean: string; mapData: MapData | null } {
  const start = text.indexOf("HARITA_BASLANGIC");
  const end = text.indexOf("HARITA_BITIS");
  if (start === -1 || end === -1) return { clean: text, mapData: null };

  const jsonStr = text.slice(start + "HARITA_BASLANGIC".length, end).trim();
  const clean = (text.slice(0, start) + text.slice(end + "HARITA_BITIS".length)).trim();

  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed && Array.isArray(parsed.noktalar)) {
      return { clean, mapData: { noktalar: parsed.noktalar } };
    }
  } catch {
    // JSON parse failed, ignore map data
  }
  return { clean, mapData: null };
}

async function geocodeGol(golAdi: string): Promise<GolKonum | null> {
  try {
    const q = encodeURIComponent(`${golAdi}, Türkiye`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=tr`,
      { headers: { "User-Agent": "VelaAtolye/1.0" } }
    );
    const data = await res.json();
    if (data[0]) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch {
    // geocoding failed
  }
  return null;
}

export default function AsistanChat() {
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState({ gol: "", hedef: HEDEF_BALIK[0], hava: HAVA[0], su: SU_SICAKLIGI[2], notlar: "" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [golKonum, setGolKonum] = useState<GolKonum | null>(null);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming, loading, mapData]);

  async function send(content: string) {
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setStreaming("");
    setLoading(true);

    try {
      const res = await fetch("/api/asistan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error("API hatası");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreaming(full);
      }

      const { clean, mapData: newMapData } = parseMapData(full);
      setMessages((prev) => [...prev, { role: "assistant", content: clean }]);
      if (newMapData) setMapData(newMapData);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Bir hata oluştu, lütfen tekrar deneyin." }]);
    } finally {
      setStreaming("");
      setLoading(false);
    }
  }

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!form.gol.trim()) return;
    setStarted(true);
    // Geocode in parallel with sending the message
    geocodeGol(form.gol).then((konum) => setGolKonum(konum));
    await send(buildFirstMessage(form));
  }

  async function handleFollowUp(e: React.FormEvent) {
    e.preventDefault();
    if (!followUp.trim() || loading) return;
    const q = followUp;
    setFollowUp("");
    await send(q);
  }

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // Clean the streaming text from the HARITA block while streaming
  const streamingClean = parseMapData(streaming).clean;

  if (!started) {
    return (
      <form className="asistan-form" onSubmit={handleStart}>
        <div className="field">
          <label htmlFor="as-gol">Göl veya Nehir Adı</label>
          <input
            id="as-gol" type="text" required
            value={form.gol} onChange={(e) => update("gol", e.target.value)}
            placeholder="örn. Atatürk Barajı, Kemer Gölü, Büyük Menderes..."
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="as-hedef">Hedef Balık</label>
            <select id="as-hedef" value={form.hedef} onChange={(e) => update("hedef", e.target.value)}>
              {HEDEF_BALIK.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="as-hava">Hava Durumu</label>
            <select id="as-hava" value={form.hava} onChange={(e) => update("hava", e.target.value)}>
              {HAVA.map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="as-su">Su Sıcaklığı</label>
          <select id="as-su" value={form.su} onChange={(e) => update("su", e.target.value)}>
            {SU_SICAKLIGI.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="as-notlar">
            Ek Bilgi <span style={{ fontWeight: 300, opacity: 0.6 }}>(isteğe bağlı)</span>
          </label>
          <textarea
            id="as-notlar" rows={3}
            value={form.notlar} onChange={(e) => update("notlar", e.target.value)}
            placeholder="Derinlik, sazlık, akıntı, daha önce ne tuttunuz, günün saati..."
          />
        </div>

        <button className="btn" type="submit">Tavsiye Al</button>
      </form>
    );
  }

  return (
    <div className="asistan-chat">
      {golKonum && mapData && (
        <div className="asistan-harita-wrap">
          <p className="asistan-harita-baslik">
            <span className="eyebrow">Strateji Haritası</span>
            <span className="asistan-harita-legend">
              <span className="legend-dot" style={{ background: "#B08A4F" }} /> Yem
              <span className="legend-dot" style={{ background: "#0C1B26" }} /> Bekleme
              <span className="legend-dot" style={{ background: "#c0392b" }} /> Dikkat
            </span>
          </p>
          <Suspense fallback={<div className="asistan-harita-loading">Harita yükleniyor…</div>}>
            <GolHaritasi
              lat={golKonum.lat}
              lng={golKonum.lng}
              noktalar={mapData.noktalar}
              golAdi={form.gol}
            />
          </Suspense>
        </div>
      )}

      <div className="asistan-messages">
        {messages.map((m, i) => (
          <div key={i} className={`asistan-msg asistan-msg--${m.role === "user" ? "user" : "ai"}`}>
            <span className="asistan-msg__label">{m.role === "user" ? "Sen" : "Asistan"}</span>
            <div className="asistan-msg__body">{m.content}</div>
          </div>
        ))}
        {streamingClean && (
          <div className="asistan-msg asistan-msg--ai">
            <span className="asistan-msg__label">Asistan</span>
            <div className="asistan-msg__body">{streamingClean}</div>
          </div>
        )}
        {loading && !streamingClean && (
          <div className="asistan-msg asistan-msg--ai">
            <span className="asistan-msg__label">Asistan</span>
            <div className="asistan-typing"><span /><span /><span /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form className="asistan-input-row" onSubmit={handleFollowUp}>
        <input
          type="text"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          placeholder="Devam eden sorunuzu yazın…"
          disabled={loading}
        />
        <button className="btn" type="submit" disabled={loading || !followUp.trim()}>
          Gönder
        </button>
      </form>
    </div>
  );
}
