import psycopg2
import hashlib

# ---------- Create A New Account ----------
# insert new user into user table

def create_new_user(conn, email, password, fullName, location):
    rsvps = 0
    password = hashlib.sha256(password.encode()).hexdigest()  # Properly hash the password
    cur = conn.cursor()

    #check username
    cur.execute("SELECT * FROM user_table WHERE email = %s", (email,))
    existing_user = cur.fetchone()

    if existing_user:
        print("Error: Email already exists.")
        return False

    cur.execute(
        """INSERT INTO user_table (full_name, email, password_hash, located_at, rsvps) VALUES
        (%s, %s, %s, %s, %s)""",
        (fullName, email, password, location, rsvps)
    )

    conn.commit()
    cur.close()

def create_new_org(conn, email, password, orgName, description, phoneNumber, location):
    numEvents = 0
    password = hashlib.sha256(password.encode()).hexdigest()
    cur = conn.cursor()

    cur.execute(
        """SELECT * FROM organization_table WHERE email = %s""", (email,)
    )
    existing_org = cur.fetchone()

    if existing_org:
        print("Error: Email already exists.")
        return False
    
    cur.execute(
        """INSERT INTO organization_table (email, password_hash, organization_name, description, phone_number, located_at, num_events) VALUES
        (%s, %s, %s, %s, %s, %s, %s)""",
        (email, password, orgName, description, phoneNumber, location, numEvents)
    )

    conn.commit()
    cur.close()

def user_login(conn, email, password):
    password = hashlib.sha256(password.encode()).hexdigest()
    cur = conn.cursor()

    cur.execute(
        """SELECT * FROM user_table WHERE email = %s and password_hash = %s""", (email, password)
    )
    existing_user = cur.fetchone()
    if existing_user:
        return True
    else:
        return False
