from http.server import BaseHTTPRequestHandler, HTTPServer

import psycopg2

hostName = "localhost"
serverPort = 8080

# ---------- CONNECT TO SERVER ----------


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


# ---------- CONNECT TO DATABASE ----------

# Define our connection string
conn_string = (
    "host='localhost' dbname='project-connect' user='USERNAME' password='PASSWORD'"
)

# print the connection string we will use to connect
print("Connecting to database\n	->%s" % (conn_string))

# get a connection, if a connect cannot be made an exception will be raised here
conn = psycopg2.connect(conn_string)

# conn.cursor will return a cursor object, you can use this cursor to perform queries
cursor = conn.cursor()
print("Connected!\n")

# ---------- CREATE A DATABASE TABLE ----------

# Open a cursor to perform database operations
cur = conn.cursor()
# Execute a command: create datacamp_courses table
cur.execute(
    """CREATE TABLE test_table(
            test_id SERIAL PRIMARY KEY);
            """
)
# Make the changes to the database persistent
conn.commit()
# Close cursor and communication with the database
cur.close()

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
