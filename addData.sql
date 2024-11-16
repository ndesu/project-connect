insert into user (user_id, username, full_name, email, password_hash, residence, rsvps)
    values (0001, 'ndesu', 'Nidhi Desu', 'nd2290@nyu.edu', 'abc1234', 'Downtown Brooklyn', '3')

insert into RSVP (rsvp_id, user_id, event_id, status)
    values (0001, 0001, 0001, 'Complete')

insert into events (event_id, created_by, event_name, event_desc, event_type, event_date, num_max_volunteers, rsvps)
    values (0001, 'Fort Greene Park', 'Park Cleanup', 'Clear leaves and garbage!', 'environmental', DATETIME 2024-11-16 10:00:00, 30, 1)

insert into mapLocation (location_id, longitude, latitude, address)
    values (0001, 40.69153, -73.97530, 'Dekalb Avenue &, S Portland Ave, Brooklyn, NY 11205')

insert into post (post_id, image_link, created_by, time_of_post)
    values (0001, "xxx", "Nidhi Desu", DATETIME 2024-11-10 9:30:00)

insert into comment (comment_id, post_id, user_id, commented_time)
    values (0001, 0001, 0001, DATETIME 2024-11-10 14:20:00)

insert into organization (organization_id, organization_name, description, email, phone_number, location, events)
    values (0001, "Fort Greene Park", "Large Park in Brooklyn", "info@fortgreenepark.org", "2126399675", "Fort Greene Park", 10)

insert into supplyRequest (event_id, organization_id, item_name, quantity, description, location)
    values (0001, 0001, "socks", 50, "warm socks for winter", "Bowery Mission")

-- QUESTIONS
-- formats for ids, locations
-- should go over how some things are linked and what data we might need for each table
-- standardize variable names?