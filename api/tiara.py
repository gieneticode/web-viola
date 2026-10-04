import json, os, re, urllib.request

BASE = "https://9router-gienetic.up.railway.app/v1"
MODELS = ["deepseek-bansos", "atria", "gemini1"]

SYSTEM = open(os.path.join(os.path.dirname(__file__), "system_prompt.txt"), encoding="utf-8").read()

async def app(scope, receive, send):
    if scope["type"] != "http":
        return
    path = scope["path"]
    method = scope["method"]
    headers = {k.decode().lower(): v.decode() for k, v in scope.get("headers", [])}

    async def send_json(status, body, extra=None):
        h = [(b"content-type", b"application/json"),
             (b"access-control-allow-origin", b"*"),
             (b"access-control-allow-methods", b"POST, GET, OPTIONS"),
             (b"access-control-allow-headers", b"Content-Type")]
        if extra: h += extra
        await send({"type": "http.response.start", "status": status, "headers": h})
        await send({"type": "http.response.body", "body": body.encode()})

    if method == "OPTIONS":
        await send_json(204, "")
        return
    if path.endswith("/health") or (method == "GET" and not path.rstrip("/").endswith("tiara")):
        await send_json(200, json.dumps({"ok": True, "name": "tiara"}))
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

    key = os.environ.get("HERMES_CUSTOM_9ROUTER_GIENETIC_UP_RAILWAY_APP_API_KEY", "REDACTED54eafe20d72-b6375f-ccb56bf6")
    reply, used = None, None
    for model in MODELS:
        for _ in range(2):
            try:
                payload = json.dumps({"model": model,
                    "messages": [{"role": "system", "content": SYSTEM}] + history,
                    "max_tokens": 300}).encode()
                req = urllib.request.Request(BASE + "/chat/completions", data=payload,
                    headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"})
                with urllib.request.urlopen(req, timeout=50) as r:
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
        reply = "Maaf, Tiara lagi sibuk. Coba lagi atau chat WhatsApp kami: https://wa.me/6280000000000"
    await send_json(200, json.dumps({"reply": reply, "model": used or "fallback"}))
