"use client";

import { useEffect, useRef } from "react";

export type HaritaNokta = {
  isim: string;
  yon: string;
  mesafe: number;
  tip: "yem" | "bekleme" | "dikkat";
  aciklama: string;
};

type Props = {
  lat: number;
  lng: number;
  noktalar: HaritaNokta[];
  golAdi: string;
};

const YON_VEKTORU: Record<string, [number, number]> = {
  "kuzey":       [1, 0],
  "kuzey-dogu":  [0.7, 0.7],
  "dogu":        [0, 1],
  "guney-dogu":  [-0.7, 0.7],
  "guney":       [-1, 0],
  "guney-bati":  [-0.7, -0.7],
  "bati":        [0, -1],
  "kuzey-bati":  [0.7, -0.7],
  "merkez":      [0, 0],
};

const TIP_RENK: Record<string, string> = {
  yem:     "#B08A4F",
  bekleme: "#0C1B26",
  dikkat:  "#c0392b",
};

const TIP_ETIKET: Record<string, string> = {
  yem:     "YEM NOKTASI",
  bekleme: "BEKLEME",
  dikkat:  "DİKKAT",
};

const BASE_OFFSET = 0.028;

export default function GolHaritasi({ lat, lng, noktalar, golAdi }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || instanceRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, { zoomControl: true }).setView([lat, lng], 13);
      instanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Lake center dot
      const centerIcon = L.divIcon({
        html: `<div style="width:10px;height:10px;border-radius:50%;background:#B08A4F;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`,
        className: "",
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });
      L.marker([lat, lng], { icon: centerIcon })
        .addTo(map)
        .bindTooltip(golAdi, { permanent: false, direction: "top", offset: [0, -8] });

      // Strategy markers
      const allPoints: L.LatLngExpression[] = [[lat, lng]];

      noktalar.forEach((nokta, i) => {
        const [dy, dx] = YON_VEKTORU[nokta.yon] ?? [0, 0];
        const nLat = lat + dy * BASE_OFFSET * nokta.mesafe;
        const nLng = lng + dx * BASE_OFFSET * nokta.mesafe;
        allPoints.push([nLat, nLng]);

        const renk = TIP_RENK[nokta.tip] ?? "#B08A4F";
        const etiket = TIP_ETIKET[nokta.tip] ?? nokta.tip;
        const num = i + 1;

        // Numbered circle marker
        const icon = L.divIcon({
          html: `
            <div style="
              width:40px;height:40px;border-radius:50%;
              background:${renk};
              border:3px solid rgba(255,255,255,0.9);
              box-shadow:0 3px 10px rgba(0,0,0,0.35);
              display:flex;align-items:center;justify-content:center;
              color:#fff;font-size:16px;font-weight:700;
              font-family:system-ui,sans-serif;
              position:relative;
            ">${num}
              <div style="
                position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);
                width:0;height:0;
                border-left:6px solid transparent;
                border-right:6px solid transparent;
                border-top:8px solid ${renk};
              "></div>
            </div>`,
          className: "",
          iconSize: [40, 48],
          iconAnchor: [20, 48],
          popupAnchor: [0, -50],
        });

        // Popup content
        const popupHtml = `
          <div style="min-width:220px;max-width:270px;font-family:system-ui,sans-serif;">
            <div style="font-size:10px;font-weight:700;letter-spacing:0.12em;color:${renk};margin-bottom:4px;">${etiket}</div>
            <div style="font-size:15px;font-weight:600;color:#16262E;margin-bottom:10px;line-height:1.3;">${num}. ${nokta.isim}</div>
            <div style="font-size:13px;line-height:1.65;color:#3a4f57;">${nokta.aciklama}</div>
          </div>`;

        const marker = L.marker([nLat, nLng], { icon }).addTo(map);
        marker.bindPopup(popupHtml, { maxWidth: 290, minWidth: 220 });

        // Permanent name label
        marker.bindTooltip(`${num}. ${nokta.isim}`, {
          permanent: true,
          direction: "right",
          offset: [12, -24],
          className: "harita-label",
        });
      });

      if (noktalar.length > 0) {
        map.fitBounds(L.latLngBounds(allPoints), { padding: [50, 50] });
      }
    });

    return () => {
      if (instanceRef.current) {
        (instanceRef.current as { remove: () => void }).remove();
        instanceRef.current = null;
      }
    };
  }, [lat, lng, noktalar, golAdi]);

  return <div ref={mapRef} className="gol-haritasi" />;
}
