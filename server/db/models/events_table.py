import hashlib

import psycopg2

# WORKING

def get_all_events(conn):
    cur = conn.cursor()

    cur.execute("""
        SELECT e.EventName, e.EventDescription, e.EventType, e.EventDate, e.EventTime, e.NumMaxVolunteers, e.RSVPs,
               o.OrganizationName, l.OrgAddress
        FROM Events e
        JOIN Organizations o ON e.OrganizationID = o.OrganizationID
        JOIN MapLocation l ON e.LocationID = l.LocationID
    """)
    events = cur.fetchall()
    events_list = []

    for event in events:
        events_list.append({
            "eventName": event[0],
            "eventDescription": event[1],
            "eventType": event[2],
            "eventDate": str(event[3]),  
            "eventTime": str(event[4]),  
            "numMaxVolunteers": event[5],
            "rsvps": event[6],
            "organizationName": event[7],
            "location": event[8]
        })

    cur.close()
    return events_list
