import datetime
import urllib.parse

import psycopg2
import requests
from db.models import lat_and_lng


def get_all_requests(conn):
    cur = conn.cursor()
    cur.execute(
        """
        SELECT supplyrequest.requestid, supplyrequest.itemname, supplyrequest.quantity, supplyrequest.supplydescription, organizations.organizationid, organizations.organizationname
        FROM supplyrequest
        INNER JOIN organizations ON supplyrequest.organizationid=organizations.organizationid;
        """
    )

    all_requests_arr = cur.fetchall()

    all_requests_data = []

    for req in all_requests_arr:
        req_dict = {}
        req_dict["requestid"] = req[0]
        req_dict["itemname"] = req[1]
        req_dict["quantity"] = req[2]
        req_dict["supplydescription"] = req[3]
        req_dict["organizationid"] = req[4]
        req_dict["organizationname"] = req[5]

        all_requests_data.append(req_dict)

    cur.execute(
        """
        SELECT supplyrequest.requestid, maplocation.locationid, maplocation.orgaddress
        FROM maplocation
        INNER JOIN supplyrequest ON maplocation.locationid=supplyrequest.locationid;
        """
    )

    all_location_arr = cur.fetchall()

    all_location_data = {}

    for row in all_location_arr:
        loc = {}
        loc["requestid"] = row[0]
        loc["locationid"] = row[1]
        loc["orgaddress"] = row[2]

        all_location_data[loc["requestid"]] = loc

    for req in all_requests_data:
        numdonations = 0
        cur.execute(
            """SELECT quantityfulfilled FROM fulfillrequest WHERE requestid = %s""",
            (req["requestid"],),
        )
        alldonations = cur.fetchall()
        for donation in alldonations:
            print("donation: ", donation)
            numdonations += donation[0]

        req["quantity"] -= numdonations

        if req["requestid"] in all_location_data:
            req["locationid"] = all_location_data[req["requestid"]]["locationid"]
            req["orgaddress"] = all_location_data[req["requestid"]]["orgaddress"]

    cur.close()
    return all_requests_data


def fulfillRequest(conn, numdonations, requestid, userid):
    cur = conn.cursor()

    current_time = datetime.datetime.now()

    cur.execute(
        """INSERT INTO fulfillrequest (requestid, userid, quantityfulfilled, datefulfilled) VALUES (%s, %s, %s, %s)
        """,
        (requestid, userid, numdonations, current_time),
    )

    conn.commit()
    cur.close()


def create_request(conn, orgID, itemName, quantity, supplyDescription, location):
    cur = conn.cursor()

    coords = lat_and_lng.get_lat_and_lng(location)
    lat, lon = coords[0], coords[1]

    cur.execute(
        """INSERT INTO maplocation (longitude, latitude, orgaddress) 
                VALUES (%s, %s, %s)""",
        (lon, lat, location),
    )

    cur.execute(
        """SELECT locationid FROM maplocation WHERE orgaddress=%s""",
        (location,),
    )
    locID = cur.fetchone()[0]

    cur.execute(
        """
                INSERT INTO supplyrequest (organizationID, itemName, quantity, supplyDescription, locationID)
                VALUES (%s, %s, %s, %s, %s)""",
        (orgID, itemName, quantity, supplyDescription, locID),
    )

    conn.commit()
    cur.close()
