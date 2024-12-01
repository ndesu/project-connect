import psycopg2

def get_map_locations(conn):
    cur = conn.cursor()
    cur.execute(
        """SELECT * FROM maplocation"""
    )

    locations = cur.fetchall()

    formattedLocations = []

    for l in locations:
        lat = float(l[2])
        lon = float(l[1])
        formattedLocations.append({
            "id": l[0],
            "lat": lat,
            "lon": lon,
            "address": l[3]
        })
    
    print(formattedLocations)

    conn.commit()
    cur.close()

    return formattedLocations