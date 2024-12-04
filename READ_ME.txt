Initial Set-up:
1. npm install

Create the Database:
1. pip3 install psycopg2-binary
2. Download PgAdmin and PostgreSQL and follow set-up steps.
3. Make sure server is running in PostgreSQL.
3. In PgAdmin, create a new database called 'project-connect'.
4. In server/index.py, at top of file, replace value of "DB_USERNAME" and "DB_PASSWORD" with your PgAdmin username and password.
5. Make sure to remove your PgAdmin username and password from this file before pushing to github.

To Run Server:
npm run start

To Stop the Server:
Ctrl + C

RESOURCES:
https://pythonbasics.org/webserver/
https://anshu-dev.medium.com/creating-a-python-web-server-from-basic-to-advanced-449fcb38e93b
https://www.datacamp.com/tutorial/tutorial-postgresql-python
https://www.psycopg.org/docs/install.html#install-from-source



Things to fix (if time):
- View comment after posting without refreshing
- Page for user posts and page for org posts
- Orgs can make posts
- Get timestamp for posts and comments and sort posts by timestamp
- Create supply request


Need to dos:
- Finish image upload for create post
- View supply requests page
- Respond to supply requests
- CSS for those pages