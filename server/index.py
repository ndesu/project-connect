import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

import psycopg2

# Let Python view files in our parent directory (i.e. 'server') so we can access 'server/db/models'
sys.path.append("..")

# Import database tables
from db.models import test_table, user_table

# Local variables

hostName = "localhost"
serverPort = 8080
DB_USERNAME = "USERNAME"
DB_PASSWORD = "PASSWORD"

# ---------- CONNECT TO SERVER ----------

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # If path received is '/', change to default path '/index.html'
        if self.path in ["/", "/home", "/events", "/map", "/profile"]:
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
    
    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length)

        try:
            data = json.loads(post_data)
            print("Received data:", data)

            if data['type'] == "createAccount":
                user_table.create_new_user(conn, data['username'], data['fullName'], data['email'], data['password'], data['city'] + ', ' + data['state'])
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                response = {"message": "Data received successfully!", "status": "success"}
                self.wfile.write(bytes(json.dumps(response), "utf-8"))
            elif data['type'] == "login":
                if user_table.user_login(conn, data['username'], data['password']):
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(b'{"message": "Login successful", "status": "success"}')
                else:
                    self.send_response(401)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(b'{"error": "Invalid credentials", "status": "failure"}')

        except json.JSONDecodeError:
            self.send_response(400)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            response = {"error": "Invalid JSON"}
            self.wfile.write(bytes(json.dumps(response), "utf-8"))


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
