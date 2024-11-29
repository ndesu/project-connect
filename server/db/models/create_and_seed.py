import psycopg2

# ---------- CREATE A DATABASE TABLE ----------


def create_tables(conn):
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a command: create datacamp_courses table
    cur.execute(
        open("server/db/models/create.sql", "r").read()
        # """CREATE TABLE IF NOT EXISTS test_table(
        #         test_id SERIAL PRIMARY KEY);
        #         """
    )

    try:
        cur.execute(
            open("server/db/models/inserts.sql", "r").read()
        )
    except:
        pass

    # Make the changes to the database persistent
    conn.commit()
    # Close cursor and communication with the database
    cur.close()
