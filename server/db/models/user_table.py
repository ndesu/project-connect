import psycopg2
import hashlib

# ---------- Create A New Account ----------
# insert new user into user table

def create_new_user(conn, userID, fullName, email, password, location):
    rsvps = 0
    password = hashlib.sha256(password.encode()).hexdigest()  # Properly hash the password
    cur = conn.cursor()

    #check username
    cur.execute("SELECT * FROM User WHERE UserID = ? OR Email = ?", (userID, email))
    existing_user = cur.fetchone()

    if existing_user:
        print("Error: UserID or Email already exists.")
        return False

    cur.execute(
        """INSERT INTO User (UserID, FullName, Email, Password, LocatedAt, RSVPs) VALUES
        (?, ?, ?, ?, ?, ?)""",
        (userID, fullName, email, password, location, rsvps)
    )

    conn.commit()
    cur.close()
