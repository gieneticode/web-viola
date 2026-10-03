"""Static server with SPA fallback (Vite/React-Router friendly)."""
import http.server, os, socketserver, sys

ROOT = "/home/ubuntu/vioco-app/dist"
os.chdir(ROOT)

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?")[0]
        if path == "/":
            self.path = "/index.html"
        elif os.path.exists("." + path) is False and "." not in os.path.basename(path):
            # unknown route without file ext → SPA fallback
            self.path = "/index.html"
        return super().do_GET()

    def log_message(self, *a):
        pass

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
class Server(socketserver.TCPServer):
    allow_reuse_address = True

with Server(("0.0.0.0", PORT), Handler) as httpd:
    httpd.serve_forever()
