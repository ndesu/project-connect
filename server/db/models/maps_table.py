import psycopg2

def get_map_locations(conn):
    cur = conn.cursor()
    # get event ids
    cur.execute(
        """SELECT locationID, organizationID, EventName FROM Events WHERE EventDate > current_date"""
    )
    eventInfo = cur.fetchall()

    cur.execute(
        """SELECT locationID, organizationID, ItemName FROM SupplyRequest"""
    )
    
    supplyInfo = cur.fetchall()

    allEventInfo = []
    for e in eventInfo:
        event = {}
        event['eventName'] = e[2]

        cur.execute("""SELECT OrganizationName FROM Organizations WHERE OrganizationID = %d""" % e[1])
        event['orgName'] = cur.fetchone()[0]

        cur.execute("""SELECT Latitude, Longitude, OrgAddress FROM MapLocation WHERE LocationID = %d""" % e[0])
        locInfo = cur.fetchone()
        event['address'] = locInfo[2]
        event['lat'] = float(locInfo[0])
        event['lng'] = float(locInfo[1])

        allEventInfo.append(event)
    
    allSupplyInfo = []
    for s in supplyInfo:
        supplyReq = {}
        supplyReq['itemName'] = s[2]

        cur.execute("""SELECT OrganizationName FROM Organizations WHERE OrganizationID = %d""" % s[1])
        supplyReq['orgName'] = cur.fetchone()[0]

        cur.execute("""SELECT Latitude, Longitude, OrgAddress FROM MapLocation WHERE LocationID = %d""" % s[0])
        locInfo = cur.fetchone()
        supplyReq['address'] = locInfo[2]
        supplyReq['lat'] = float(locInfo[0])
        supplyReq['lng'] = float(locInfo[1])

        allSupplyInfo.append(supplyReq)

    conn.commit()
    cur.close()

    print([allEventInfo, allSupplyInfo])

    return [allEventInfo, allSupplyInfo]

def get_user_location(conn, email):
    cur = conn.cursor()

    cur.execute(
        """SELECT locatedAt FROM Users WHERE email=%s""", (email,)
    )
    existing_loc = cur.fetchone()

    if not existing_loc:
        cur.execute(
            """SELECT locatedAt FROM Organizations WHERE email=%s""", (email,)
        )
        existing_loc = cur.fetchone()
    
    return existing_loc