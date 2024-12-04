import hashlib

import psycopg2

# ---------- Create A New Account ----------
# insert new user into user table


def create_new_user(conn, email, password, fullName, location):
    rsvp = 0
    password = hashlib.sha256(
        password.encode()
    ).hexdigest()  # Properly hash the password
    cur = conn.cursor()

    # check username
    cur.execute("""SELECT * FROM users WHERE email = %s""", (email,))
    existing_user = cur.fetchone()

    if existing_user:
        print("Error: Email already exists.")
        return False

    cur.execute(
        """INSERT INTO users (FullName, Email, PasswordHash, LocatedAt, RSVPs) VALUES
        (%s, %s, %s, %s, %s)""",
        (fullName, email, password, location, rsvp),
    )

    conn.commit()
    cur.close()


def create_new_org(conn, email, password, orgName, description, phoneNumber, location):
    numEvents = 0
    password = hashlib.sha256(password.encode()).hexdigest()
    cur = conn.cursor()

    cur.execute("""SELECT * FROM organizations WHERE email = %s""", (email,))
    existing_org = cur.fetchone()

    if existing_org:
        print("Error: Email already exists.")
        return False

    cur.execute(
        """INSERT INTO organizations (OrganizationName, OrgDescription, Email, PhoneNumber, PasswordHash, LocatedAt, TotalEvents) VALUES
        (%s, %s, %s, %s, %s, %s, %s)""",
        (orgName, description, email, phoneNumber, password, location, numEvents),
    )

    conn.commit()
    cur.close()


def user_login(conn, email, password):
    password = hashlib.sha256(password.encode()).hexdigest()
    cur = conn.cursor()

    cur.execute(
        """SELECT * FROM users WHERE Email = %s and PasswordHash = %s""",
        (email, password),
    )
    existing_user = cur.fetchone()
    if existing_user:
        return True
    else:
        cur.execute(
            """SELECT * FROM organizations WHERE Email = %s and PasswordHash = %s""",
            (email, password),
        )
        existing_org = cur.fetchone()

        if existing_org:
            return True
        else:
            return False


def get_client(conn, email):
    print("\n\nEmail in get_client: ", email)
    cur = conn.cursor()

    client_info = {}

    cur.execute("""SELECT * FROM users WHERE email = %s""", (email,))
    user = cur.fetchone()
    print("\n\nUser: ", user)
    if user:
        client_info["clienttype"] = "user"
        client_info["clientid"] = user[0]
        client_info["name"] = user[1]
        client_info["email"] = user[2]

    else:
        cur.execute("""SELECT * FROM organizations WHERE Email = %s""", (email,))
        org = cur.fetchone()
        if org:
            client_info["clienttype"] = "org"
            client_info["clientid"] = org[0]
            client_info["name"] = org[1]
            client_info["email"] = org[2]

    return client_info


def get_all_profile(conn):
    cur = conn.cursor()

    #  user
    cur.execute(
        """
                SELECT users.fullName, users.email, users.locatedat, users.rsvps 
                FROM users"""
    )
    all_profile_arr = cur.fetchall()
    all_profile_data = []

    for profile in all_profile_arr:
        all_profile_data.append(
            {
                "fullName": profile[0],
                "email": profile[1],
                "locatedAt": profile[2],
                "rsvp": profile[3],
            }
        )

    # organization
    cur.execute(
        """
        SELECT organizations.organizationName, organizations.orgdescription, organizations.email, organizations.phonenumber, organizations.locatedat, organizations.totalevents
        FROM organizations
    """
    )

    org_profile_arr = cur.fetchall()

    for org_profile in org_profile_arr:
        all_profile_data.append(
            {
                "organizationName": org_profile[0],
                "orgDescription": org_profile[1],
                "email": org_profile[2],
                "phoneNumber": org_profile[3],
                "locatedAt": org_profile[4],
                "totalEvents": org_profile[5],
            }
        )

    cur.close()
    return all_profile_data
