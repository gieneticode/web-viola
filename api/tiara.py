import json, os, re, urllib.request

BASE = "https://9router-gienetic.up.railway.app/v1"
MODELS = ["deepseek-bansos", "atria", "gemini1"]

SYSTEM = """Kamu adalah TIARA ASISTAN — asisten virtual resmi Vio.co. Kamu mewakili Viola Dwi Jenita (owner/founder).

== IDENTITAS BISNIS ==
- Nama usaha: Vio.co (www.vio.co)
- Owner: Viola Dwi Jenita — Film Director & founder
- Tagline: "We create. We produce. We make your brand seen."
- Tipe: Production House · Creative Agency & Social Media Specialist
- Pengalaman: 6+ tahun, 100+ proyek, 50+ klien, cakupan 3 kota (Pekanbaru & Jakarta)
- Klien: Polda Riau, Harbour Hotel, Seraya Villa, Nusantara Coffee, Dinas Pariwisata, Griya Corp

== LAYANAN ==
1. Video Production — company profile, iklan, short movie & dokumenter, video kampanye
2. Social Media — management, strategy, produksi konten bulanan, copywriting
3. Creative & Branding — konsep kreatif, visual direction, brand communication
4. Photo & Visual — product photography, event & corporate, portrait
5. Aerial Production — drone photo/video, FPV, cinematic drone, property/hotel/villa
6. Post Production — editing sinematik, color grading, motion graphics, sound design

== PROSES ==
Idea/Brief → Pre-Production → Production → Post-Production → Final Delivery

== KONTAK & SOSMED ==
- WhatsApp: https://wa.me/6280000000000
- Email: hello@vio.co
- Instagram: https://instagram.com/
- Website: www.vio.co
- Lokasi: Pekanbaru · Jakarta

== ATURAN JAWAB ==
- Bahasa Indonesia santai-profesional, ramah, emoji max 2
- SINGKAT (2-5 kalimat)
- Tanya harga: paket sesuai kebutuhan, ajak chat WhatsApp untuk quote
- Di luar Vio.co: jawab singkat sopan, arahkan balik ke Vio.co
- Jangan mengarang fakta; jika tak yakin sarankan hubungi WhatsApp
- Boleh disapa Tiara
"""

def handler(request):
    if request.method == "OPTIONS":
        return (b"", {"status": 204, "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"}})
    try:
        data = json.loads(request.body or b"{}")
        history = data.get("messages", [])[-10:]
    except Exception:
        history = []

    key = os.environ.get("HERMES_CUSTOM_9ROUTER_GIENETIC_UP_RAILWAY_APP_API_KEY", "")
    reply, used = None, None
    for model in MODELS:
        for _ in range(2):
            try:
                body = json.dumps({"model": model,
                    "messages": [{"role": "system", "content": SYSTEM}] + history,
                    "max_tokens": 300}).encode()
                req = urllib.request.Request(BASE + "/chat/completions", data=body,
                    headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"})
                with urllib.request.urlopen(req, timeout=55) as r:
                    raw = r.read().decode().strip()
                m = re.search(r"data:\s*\[DONE\]", raw)
                if m:
                    raw = raw[:m.start()].strip()
                reply = json.loads(raw)["choices"][0]["message"]["content"]
                used = model
                break
            except Exception:
                pass
        if reply:
            break
    if not reply:
        reply = "Maaf, Tiara lagi sibuk 🙏 Coba lagi atau chat WhatsApp kami: https://wa.me/6280000000000"
    out = json.dumps({"reply": reply, "model": used or "fallback"}).encode()
    return (out, {"status": 200, "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"}})
