import hashlib

import psycopg2

# WORKING

def get_all_events(conn):
    cur = conn.cursor()

    cur.execute("""
        SELECT e.EventID, e.EventName, e.EventDescription, e.EventType, e.EventDate, e.EventTime, e.NumMaxVolunteers, e.RSVPs,
               o.OrganizationName, l.OrgAddress
        FROM Events e
        JOIN Organizations o ON e.OrganizationID = o.OrganizationID
        JOIN MapLocation l ON e.LocationID = l.LocationID
    """)
    events = cur.fetchall()
    events_list = []

    for event in events:
        events_list.append({
            "eventID": event[0],
            "eventName": event[1],
            "eventDescription": event[2],
            "eventType": event[3],
            "eventDate": str(event[4]),  
            "eventTime": str(event[5]),  
            "numMaxVolunteers": event[6],
            "rsvps": event[7],
            "organizationName": event[8],
            "location": event[9]
        })

    cur.close()
    return events_list

def get_user_events(conn, user_id):
    cur = conn.cursor()

    cur.execute("""
                SELECT * FROM rsvp WHERE userid=%d and rsvpstatus='Confirmed'""" % user_id)
    
    rsvps = cur.fetchall()
    print(rsvps)

    cur.close()
    conn.commit()

    return rsvps

def rsvp_event(conn, event_id, user_id):
    cur = conn.cursor()

    cur.execute("""SELECT * FROM rsvp WHERE eventid=%s and userid=%s""", (event_id, user_id))
    existing = cur.fetchone()

    if existing:
        cur.execute("""UPDATE rsvp SET rsvpstatus = %s WHERE eventid = %s AND userid = %s""", 
                ('Confirmed', event_id, user_id))
    else:
        print('this')
        cur.execute("""INSERT INTO rsvp (userid, eventid, rsvpstatus) VALUES (%s, %s, %s)""", (user_id, event_id, 'Confirmed'))

    cur.execute("""
                SELECT * FROM rsvp WHERE userid=%s and rsvpstatus='Confirmed'""", (user_id,))
    
    rsvps = cur.fetchall()
    print(rsvps)
    
    cur.close()
    conn.commit()


    return rsvps

def cancel_rsvp(conn, event_id, user_id):
    cur = conn.cursor()

    cur.execute("""UPDATE rsvp SET rsvpstatus = %s WHERE eventid = %s AND userid = %s""", 
                ('Cancelled', event_id, user_id))
    
    cur.execute("""
                SELECT * FROM rsvp WHERE userid=%s and rsvpstatus='Confirmed'""", (user_id,))
    
    rsvps = cur.fetchall()
    print(rsvps)
    
    cur.close()
    conn.commit()


    return rsvps

def get_user_events_info(conn, user_id):
    rsvps = get_user_events(conn, user_id)
    eventids = []
    for r in rsvps:
        eventids.append(r[2])

    cur = conn.cursor()
    
    eventinfo = []
    for e in eventids:
        cur.execute("""
                    SELECT * FROM Events WHERE eventid=%s
                    """, (e,))
        info = cur.fetchone()
        info = {
            "eventID": info[0],
            "organizationID": info[1],
            "eventName": info[2],
            "eventDescription": info[3],
            "eventtype": info[4],
            "date": str(info[5]),
            "time": str(info[6]),
            "maxVolunteers": info[7],
            "rsvps": info[8],
            "locationid": info[9]
        }

        cur.execute("""SELECT orgaddress FROM maplocation WHERE locationid=%s""", (info["locationid"],))
        address = cur.fetchone()
        info["address"] = address[0] 

        eventinfo.append(info)


    cur.close()
    conn.commit()

    return eventinfo

def get_org_events_info(conn, orgID):
    cur = conn.cursor()

    cur.execute("""
                SELECT * FROM organizations WHERE organizationid=%s""", (orgID,))
    
    info = cur.fetchall()
    eventinfo = []
    for e in info:
        e = {
            "eventid": e[0],
            "eventName": e[2],
            "date": str(e[5]),
            "time": str(e[6]),
            "locationid": e[9]
        }

        cur.execute("""SELECT orgaddress FROM maplocation WHERE locationid=%s""", (info["locationid"],))
        address = cur.fetchone()
        e["address"] = address[0]

        eventinfo.append(e)
    
    cur.close()
    conn.commit()

    return eventinfo


