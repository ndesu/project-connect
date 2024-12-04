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
