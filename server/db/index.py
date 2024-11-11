import psycopg2

conn = psycopg2.connect(
    database="project-connect",
    user="adriaorenstein",
    host="localhost",
    password="pg-adria",
    port=5432,
)

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
conn.close()
