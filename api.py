import sys
import os
from urllib.parse import urlparse
from urllib.parse import parse_qs
from http.server import SimpleHTTPRequestHandler, HTTPServer


class Handler(SimpleHTTPRequestHandler):

    def do_GET(self):
        res_file = self.get_file(self.path)
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        with open('./samples/{}'.format(res_file), 'rb') as f:
            self.wfile.write(f.read())

    def get_file(self, path):
        url = urlparse(path)
        params = parse_qs(url.query)
        res = params.get('res', '')
        if isinstance(res, list) and len(res) == 1 and os.path.isfile('./samples/{}'.format(res[0])):
            return res[0]
        return 'sample1.json'





def main():
    port = int(sys.argv[1]) if len(sys.argv) == 2  else 8000
    with HTTPServer(('', port), Handler) as server:
        print("http://localhost:{}".format(port))
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == '__main__':
    main()

