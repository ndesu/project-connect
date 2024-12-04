import datetime

import psycopg2


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

    print("all req arr: ", all_requests_arr)

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

    print("all loc arr: ", all_location_arr)

    all_location_data = {}

    for row in all_location_arr:
        loc = {}
        loc["requestid"] = row[0]
        loc["locationid"] = row[1]
        loc["orgaddress"] = row[2]

        all_location_data[loc["requestid"]] = loc

    for req in all_requests_data:
        if req["requestid"] in all_location_data:
            req["locationid"] = all_location_data[req["requestid"]]["locationid"]
            req["orgaddress"] = all_location_data[req["requestid"]]["orgaddress"]

    cur.close()
    return all_requests_data
