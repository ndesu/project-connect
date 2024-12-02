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
        SELECT posts.postid, posts.userid, posts.postimage, posts.posttext, users.fullname
        FROM posts
        INNER JOIN users ON posts.userid=users.userid;
        """
    )

    all_posts_arr = cur.fetchall()

    all_posts_data = []

    for post in all_posts_arr:
        post_dict = {}
        post_dict["postid"] = post[0]
        post_dict["userid"] = post[1]
        post_dict["postimage"] = post[2]
        post_dict["posttext"] = post[3]
        post_dict["postername"] = post[4]
        post_dict["comments"] = []

        all_posts_data.append(post_dict)

    cur.execute(
        """
        SELECT comments.commentid, comments.postid, comments.userid, comments.postedcomment, users.fullname
        FROM comments
        INNER JOIN users ON comments.userid=users.userid;
        """
    )

    all_comments_arr = cur.fetchall()

    all_comments_data = {}

    for row in all_comments_arr:
        comment = {}
        comment["commentid"] = row[0]
        comment["postid"] = row[1]
        comment["userid"] = row[2]
        comment["postedcomment"] = row[3]
        comment["fullname"] = row[4]

        if comment["postid"] in all_comments_data:
            all_comments_data[comment["postid"]].append(comment)
        else:
            all_comments_data[comment["postid"]] = [comment]

    print("all_comments_data: ", all_comments_data)

    for post in all_posts_data:
        if post["postid"] in all_comments_data:
            post["comments"] = all_comments_data[post["postid"]]

    print("all_posts_data: ", all_posts_data)
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
