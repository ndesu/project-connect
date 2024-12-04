import base64
import json
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from mimetypes import guess_type

import psycopg2

from db.models import create_and_seed

# Let Python view files in our parent directory (i.e. 'server') so we can access 'server/db/models'
sys.path.append("..")

# Import database tables
from db.models import events_table, maps_table, post_table, user_table

# Local variables

hostName = "localhost"
serverPort = 8080
DB_USERNAME = "adriaorenstein"
DB_PASSWORD = "pg-adria"

# ---------- CONNECT TO SERVER ----------


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    # gets
    def do_GET(self):
        if self.path.startswith("/static/"):
            static_file_path = self.path[1:]
            try:
                with open(static_file_path, "rb") as static_file:
                    content = static_file.read()
                content_type, _ = guess_type(static_file_path)
                if not content_type:
                    content_type = "application/octet-stream"

                self.send_response(200)
                self.send_header("Content-type", content_type)
                self.end_headers()
                self.wfile.write(content)
            except FileNotFoundError:
                self.send_error(404, "File not found")
            return
        if self.path == "/get_all_posts":
            response = post_table.get_all_posts(conn)
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(response), "utf-8"))

        # HERE -> get profile info
        elif self.path == "/get_all_profile":
            response = user_table.get_all_profile(conn)
            print("Profiles:", response)

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(response), "utf-8"))

        # HERE -> get events info
        elif self.path == "/get_all_events":
            response = events_table.get_all_events(conn)
            print("Events:", response)

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(response), "utf-8"))

        elif self.path == "/map":
            locations = maps_table.get_map_locations(conn)
            print(locations)
            try:
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                response = locations
                self.wfile.write(bytes(json.dumps(response), "utf-8"))
            except Exception as e:
                print("Error: ", e)
                # set response code
                self.send_response(404)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                # set body to error message
                self.wfile.write(b"404 - Not Found")
            self.path = "../client/public/index.html"
        else:
            # If path received is '/', change to default path '/index.html'
            if self.path in ("/", "/home", "/events", "/map", "/profile", "/newpost"):
                self.path = "../public/index.html"
            try:
                extension = self.path[-3:]
                # set response code
                if extension == "png" or extension == "jpg" or extension == "jpeg":
                    with open(self.path[1:], "rb") as f:
                        file_to_open = f.read()
                    self.send_response(200)
                    if extension == "png":
                        self.send_header("Content-type", "image/png")
                    else:
                        self.send_header("Content-type", "image/jpeg")
                    self.end_headers()
                    # set body to file content
                    self.wfile.write(file_to_open)
                else:
                    file_to_open = open(self.path[1:]).read()
                    self.send_response(200)
                    self.send_header("Content-type", "text/html")
                    self.end_headers()
                    # set body to file content
                    self.wfile.write(bytes(file_to_open, "utf-8"))

            # If file is not found, return 404 error
            except Exception as e:
                print("\n\nError getting file: ", e)
                # set response code
                self.send_response(404)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                # set body to error message
                self.wfile.write(b"404 - Not Found")

    # posts
    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length)

        try:
            data = json.loads(post_data)

        except json.JSONDecodeError as e:
            print("Json decode error: ", e)
            self.send_response(400)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            response = {"error": "Invalid JSON"}
            self.wfile.write(bytes(json.dumps(response), "utf-8"))

        if data["type"] == "createUserAccount":
            user_table.create_new_user(
                conn,
                data["email"],
                data["password"],
                data["fullName"],
                data["city"] + ", " + data["state"],
            )

            client_info = user_table.get_client(conn, data["email"])

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            response = {
                "message": "Data received successfully!",
                "status": "success",
                "clientinfo": client_info,
            }
            self.wfile.write(bytes(json.dumps(response), "utf-8"))
        elif data["type"] == "createOrgAccount":
            user_table.create_new_org(
                conn,
                data["email"],
                data["password"],
                data["orgName"],
                data["description"],
                data["phoneNumber"],
                data["city"] + ", " + data["state"],
            )

            client_info = user_table.get_client(conn, data["email"])

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            response = {
                "message": "Data received successfully!",
                "status": "success",
                "clientinfo": client_info,
            }
            self.wfile.write(bytes(json.dumps(response), "utf-8"))
        elif data["type"] == "login":
            if user_table.user_login(conn, data["email"], data["password"]):
                client_info = user_table.get_client(conn, data["email"])
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                response = {
                    "message": "Login successful",
                    "status": "success",
                    "clientinfo": client_info,
                }
                self.wfile.write(bytes(json.dumps(response), "utf-8"))
            else:
                self.send_response(401)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(
                    b'{"error": "Invalid credentials", "status": "failure"}'
                )
        elif data["type"] == "getMapCenter":
            response = maps_table.get_user_location(conn, data["email"])
            print(response)
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(response), "utf-8"))
        elif data["type"] == "createComment":
            print("Data from comment: ", data)
            post_table.create_new_comment(
                conn, data["postid"], data["userid"], data["commenttext"]
            )
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            response = {
                "message": "Comment created successfully",
                "status": "success",
            }
            self.wfile.write(bytes(json.dumps(response), "utf-8"))

        elif data["type"] == "createNewPost":

            dir_path = "%s/public/assets/user_images/%s" % (
                os.getcwd(),
                str(data["clientid"]),
            )
            if not (os.path.exists(dir_path) and os.path.isdir(dir_path)):
                os.mkdir(dir_path)

            file_path = "%s/public/assets/user_images/%s/%s" % (
                os.getcwd(),
                str(data["clientid"]),
                data["imgname"],
            )

            with open(file_path, "wb") as f:
                f.write(base64.b64decode(data["imgdata"]))
            post_table.create_new_post(
                conn,
                data["imgname"],
                data["posttext"],
                data["clientid"],
                data["clienttype"],
            )

            # self.send_response(200)
            # self.send_header("Content-type", "application/json")
            # self.end_headers()
            # response = {
            #     "message": "Post created successfully",
            #     "status": "success",
            # }
            # self.wfile.write(bytes(json.dumps(response), "utf-8"))

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            response = {
                "message": "Post created successfully",
                "status": "success",
            }
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

create_and_seed.create_tables(conn)

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
