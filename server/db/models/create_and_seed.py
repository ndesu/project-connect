import psycopg2

# ---------- CREATE A DATABASE TABLE ----------


def create_tables(conn):
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a command: create datacamp_courses table

    # ------ DELETE ALL TABLES ------
    # print("Deleting tables...")
    # try:
    #     cur.execute(open("server/db/models/delete.sql", "r").read())
    # except Exception as e:
    #     print("\n\nERROR DELETING TABLES: ", e)

    # # ------ CREATE ALL TABLES ------
    # print("Creating tables...")
    # try:
    #     cur.execute(open("server/db/models/create.sql", "r").read())
    # except Exception as e:
    #     print("\n\nERROR CREATING TABLES: ", e)

    # # ------ INSERT SEED DATA INTO TABLES ------
    print("Inserting into tables...")
    try:
        cur.execute(open("server/db/models/inserts.sql", "r").read())
    except Exception as e:
        print("\n\nERROR EXECUTING INSERTS: ", e)

    # Make the changes to the database persistent
    conn.commit()
    # Close cursor and communication with the database
    cur.close()
