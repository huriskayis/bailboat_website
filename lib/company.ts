// Tüm satıcı bilgileri buradan okunur. Yer tutucuları vergi levhasındaki gerçek bilgilerle doldurun.
export const COMPANY = {
  SATICI_UNVAN: "{{SATICI_UNVAN — vergi levhasındaki tam ünvan}}",
  VERGI_DAIRESI: "{{VERGI_DAIRESI}}",
  VKN: "{{VKN}}",
  MERSIS_NO: "", // boş bırakılırsa gösterilmez
  ADRES: "{{ADRES — vergi levhasıyla aynı açık adres}}, Denizli, Türkiye",
  TELEFON: "{{TELEFON}}",
  EPOSTA: "info@velayembotu.com",
  WHATSAPP: "+90 551 364 94 90",
  KEP: "", // boş bırakılırsa gösterilmez
  KARGO_FIRMASI: "{{KARGO_FIRMASI}}",
  KARGO_SURESI_IS_GUNU: "{{KARGO_SURESI_IS_GUNU}}",
  CALISMA_SAATLERI: "{{CALISMA_SAATLERI}}",
  GARANTI_SURESI: "{{GARANTI_SURESI}}",
  MARKA: "VELA Yem Botu",
  SITE_URL: "velayembotu.com",
} as const;
