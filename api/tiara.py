import json, os, urllib.request

BASE = "https://gienetic-agent.web.id/v1"
MODEL = "glm_unce"

SYSTEM = open(os.path.join(os.path.dirname(__file__), "system_prompt.txt"), encoding="utf-8").read()

async def app(scope, receive, send):
    if scope["type"] != "http":
        return
    path = scope["path"]
    method = scope["method"]

    async def send_json(status, body):
        h = [(b"content-type", b"application/json"),
             (b"access-control-allow-origin", b"*"),
             (b"access-control-allow-methods", b"POST, GET, OPTIONS"),
             (b"access-control-allow-headers", b"Content-Type")]
        await send({"type": "http.response.start", "status": status, "headers": h})
        await send({"type": "http.response.body", "body": body.encode()})

    if method == "OPTIONS":
        await send_json(204, "")
        return
    if method == "GET":
        await send_json(200, json.dumps({"ok": True, "name": "tiara", "model": MODEL}))
        return

    body = b""
    while True:
        msg = await receive()
        if msg["type"] == "http.request":
            body += msg.get("body", b"")
            if not msg.get("more_body"):
                break
        else:
            break

    try:
        data = json.loads(body or b"{}")
        history = data.get("messages", [])[-10:]
    except Exception:
        history = []

    key = os.environ.get("NINEROUTER_API_KEY", "sk-604375e5b83ed932-q8kig0-5ebf9200")
    if not key:
        await send_json(200, json.dumps({"reply": "Maaf, konfigurasi Tiara belum lengkap. Hubungi WhatsApp kami: https://wa.me/6287840403048", "model": "fallback"}))
        return

    reply = None
    for _ in range(3):
        try:
            payload = json.dumps({
                "model": MODEL,
                "messages": [{"role": "system", "content": SYSTEM}] + history,
                "max_tokens": 400,
                "temperature": 0.8,
            }).encode()
            req = urllib.request.Request(
                BASE + "/chat/completions",
                data=payload,
                headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"},
            )
            with urllib.request.urlopen(req, timeout=45) as r:
                raw = r.read().decode()
            content = json.loads(raw)["choices"][0]["message"]["content"]
            reply = content.strip()
            break
        except Exception:
            continue

    if not reply:
        reply = "Waduh, koneksinya lagi bermasalah \U0001f605 Coba lagi ya, atau langsung WhatsApp kami di https://wa.me/6287840403048"
    await send_json(200, json.dumps({"reply": reply, "model": MODEL}))
