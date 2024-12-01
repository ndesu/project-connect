import psycopg2

# ---------- CREATE A DATABASE TABLE ----------


# def create_post_table(conn):
#     # Open a cursor to perform database operations
#     cur = conn.cursor()
#     # Execute a command: create datacamp_courses table
#     cur.execute(
#         """CREATE TABLE IF NOT EXISTS post_table(
#                 post_id SERIAL PRIMARY KEY,
#                 test_num INT);
#                 """
#     )
#     # Make the changes to the database persistent
#     conn.commit()
#     # Close cursor and communication with the database
#     cur.close()


def get_all_posts(conn):
    cur = conn.cursor()
    cur.execute(
        """
        SELECT postid, userid, postimage, posttext FROM posts
        """
    )
    all_posts_data = cur.fetchall()
    print("all_posts_data: ", all_posts_data, "\nType: ", type(all_posts_data))
    cur.close()
    return all_posts_data


# def insert_seed_data(conn):
#     cur = conn.cursor()
#     cur.execute(
#         """INSERT INTO post_table (test_num) VALUES
#         (%s)""",
#         ([1]),
#     )
#     cur.execute(
#         """INSERT INTO post_table (test_num) VALUES
#         (%s)""",
#         ([2]),
#     )
#     cur.execute(
#         """INSERT INTO post_table (test_num) VALUES
#         (%s)""",
#         ([3]),
#     )
#     conn.commit()
#     cur.close()
