import psycopg2
import hashlib

# ---------- Create A New Account ----------
# insert new user into user table

def create_new_user(conn, userID, fullName, email, password, location):
    rsvps = 0
    password = hashlib.sha256(password.encode()).hexdigest()  # Properly hash the password
    cur = conn.cursor()

    #check username
    cur.execute("SELECT * FROM user_table WHERE user_id = %s OR email = %s", (userID, email))
    existing_user = cur.fetchone()

    if existing_user:
        print("Error: UserID or Email already exists.")
        return False

    cur.execute(
        """INSERT INTO user_table (user_id, full_name, email, password_hash, located_at, rsvps) VALUES
        (%s, %s, %s, %s, %s, %s)""",
        (userID, fullName, email, password, location, rsvps)
    )

    conn.commit()
    cur.close()

def user_login(conn, userID, password):
    password = hashlib.sha256(password.encode()).hexdigest()
    cur = conn.cursor()

    cur.execute(
        """SELECT * FROM user_table WHERE user_id = %s and password_hash=%s""", (userID, password)
    )
    existing_user = cur.fetchone()
    if existing_user:
        return True
    else:
        return False
