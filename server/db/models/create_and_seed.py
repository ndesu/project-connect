import psycopg2

# ---------- CREATE A DATABASE TABLE ----------


def create_tables(conn):
    print("Creating tables...")
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a command: create datacamp_courses table

    # ------ DELETE ALL TABLES ------

    # try:
    #     cur.execute(open("server/db/models/delete.sql", "r").read())
    # except Exception as e:
    #     print("\n\nERROR DELETING TABLES: ", e)

    # ------ CREATE ALL TABLES ------

    try:
        cur.execute(open("server/db/models/create.sql", "r").read())
    except Exception as e:
        print("\n\nERROR CREATING TABLES: ", e)
        pass

    # ------ INSERT SEED DATA INTO TABLES ------

    try:
        cur.execute(open("server/db/models/inserts.sql", "r").read())
    except Exception as e:
        print("\n\nERROR EXECUTING INSERTS: ", e)
        pass

    # Make the changes to the database persistent
    conn.commit()
    # Close cursor and communication with the database
    cur.close()
