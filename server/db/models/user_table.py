import psycopg2
import hashlib

# ---------- Create A New Account ----------
# insert new user into user table

def create_new_user(conn, email, password, fullName, location):
    rsvps = 0
    password = hashlib.sha256(password.encode()).hexdigest()  # Properly hash the password
    cur = conn.cursor()

    #check username
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing_user = cur.fetchone()

    if existing_user:
        print("Error: Email already exists.")
        return False

    cur.execute(
        """INSERT INTO users (FullName, Email, PasswordHash, LocatedAt, RSVPs) VALUES
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
        """SELECT * FROM organizations WHERE email = %s""", (email,)
    )
    existing_org = cur.fetchone()

    if existing_org:
        print("Error: Email already exists.")
        return False
    
    cur.execute(
        """INSERT INTO organization_table (OrganizationName, OrgDescription, Email, PhoneNumber, PasswordHash, LocatedAt, TotalEvents) VALUES
        (%s, %s, %s, %s, %s, %s, %s)""",
        (orgName, description, email, phoneNumber, password, location, numEvents)
    )

    conn.commit()
    cur.close()

def user_login(conn, email, password):
    password = hashlib.sha256(password.encode()).hexdigest()
    cur = conn.cursor()

    cur.execute(
        """SELECT * FROM users WHERE Email = %s and PasswordHash = %s""", (email, password)
    )
    existing_user = cur.fetchone()
    if existing_user:
        return True
    else:
        cur.execute(
            """SELECT * FROM organizations WHERE Email = %s and PasswordHash = %s""", (email, password)
        )
        existing_org = cur.fetchone()
        
        if existing_org:
            return True
        else:
            return False