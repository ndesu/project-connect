import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

import psycopg2

# Let Python view files in our parent directory (i.e. 'server') so we can access 'server/db/models'
sys.path.append("..")

# Import database tables
from db.models import test_table

# Local variables

hostName = "localhost"
serverPort = 8080
DB_USERNAME = "USERNAME"
DB_PASSWORD = "PASSWORD"

# ---------- CONNECT TO SERVER ----------


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # If path received is '/', change to default path '/index.html'
        if self.path == "/" or self.path == "/home" or self.path == "/events" or self.path == "/map" or self.path == "/profile":
            self.path = "../client/public/index.html"

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

# ---------- CONNECT TO DATABASE ----------

# Define our connection string

conn_string = "host='localhost' dbname='project-connect' user=%s password=%s" % (
    DB_USERNAME,
    DB_PASSWORD,
)

print("Connecting to database...\n")

# Get a connection, if a connect cannot be made an exception will be raised here
conn = psycopg2.connect(conn_string)

print("Connected!\n")

# ---------- CREATE TABLES (if they don't exist) ----------

test_table.create_test_table(conn)

# ---------- RUN/STOP SERVER ----------

# Continuously look for server requests
try:
    webServer.serve_forever()
# If a keyboard interrupt is detected, close the server
except KeyboardInterrupt:
    pass

webServer.server_close()
conn.close()
print("Server stopped.")
