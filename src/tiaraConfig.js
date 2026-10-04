/* Konfigurasi backend Tiara.
   Primary: Dahl inference (DeepSeek-V4-Flash) — HTTPS + CORS terbuka, balas ~2s.
   Catatan: 9router VPS cuma HTTP, browser block mixed-content dari halaman
   HTTPS, jadi tidak bisa dipanggil langsung dari frontend. */

export const CHAIN = [
  {
    label: "dahl",
    url: "https://inference.dahl.global/v1/chat/completions",
    key: "dahl_9AQHubnxMPKssTcXkXvfDtAH6Jn392hnV",
    model: "deepseek-ai/DeepSeek-V4-Flash-0731",
    timeout: 20000,
  },
  {
    label: "dahl-2",
    url: "https://inference.dahl.global/v1/chat/completions",
    key: "dahl_5dvugnD1de7tjX4cMCSNSyDX1CiLr4j5U",
    model: "deepseek-ai/DeepSeek-V4-Flash-0731",
    timeout: 20000,
  },
];
