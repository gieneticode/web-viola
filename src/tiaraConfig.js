/* Konfigurasi backend Tiara — rantai fallback biar chat gak pernah mati.
   1. 9router VPS (deepseek-bansos) — sesuai spesifikasi owner
   2. 9router VPS (atria) — model cepat di server yang sama
   3. Dahl inference (DeepSeek-V4-Flash) — cadangan publik, cepat & stabil */

export const CHAIN = [
  {
    label: "9router-bansos",
    url: "http://43.156.116.187:20128/v1/chat/completions",
    key: "REDACTED",
    model: "deepseek-bansos",
    timeout: 20000,
  },
  {
    label: "9router-atria",
    url: "http://43.156.116.187:20128/v1/chat/completions",
    key: "REDACTED",
    model: "atria",
    timeout: 30000,
  },
  {
    label: "dahl",
    url: "https://inference.dahl.global/v1/chat/completions",
    key: "REDACTEDV",
    model: "deepseek-ai/DeepSeek-V4-Flash-0731",
    timeout: 20000,
  },
];
