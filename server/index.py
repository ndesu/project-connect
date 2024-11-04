from http.server import BaseHTTPRequestHandler, HTTPServer

hostName = "localhost"
serverPort = 8080


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # If path received is '/', change to default path '/index.html'
        if self.path == "/":
            self.path = "../public/index.html"

        # Try to open the requested file
        try:
            file_to_open = open(self.path[1:]).read()
            # set response code
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            # set body to file content
            self.wfile.write(bytes(file_to_open, "utf-8"))
        # If file is not found, return 404 error
        except:
            # set response code
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            # set body to error message
            self.wfile.write(b"404 - Not Found")


# Create web server
webServer = HTTPServer((hostName, serverPort), SimpleHTTPRequestHandler)

print("Server started at http://%s:%s" % (hostName, serverPort))

# Continuously look for server requests
try:
    webServer.serve_forever()
# If a keyboard interrupt is detected, close the server
except KeyboardInterrupt:
    pass

webServer.server_close()
print("Server stopped.")


# RESOURCES:
# https://pythonbasics.org/webserver/
# https://anshu-dev.medium.com/creating-a-python-web-server-from-basic-to-advanced-449fcb38e93b
