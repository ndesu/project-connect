-- Project Connect Insert files

INSERT INTO Users (UserID, FullName, Email, PasswordHash, LocatedAt, RSVPs) VALUES  
    (1, 'Nidhi Desu', 'nidhidesu@gmail.com', 'password123', 'New York', 0),
    (2, 'Xena Maldonado', 'xenamaldonado@gmail.com', 'password456', 'Los Angeles', 0),
    (3, 'Adria Orenstein', 'adriaorenstein@gmail.com', 'password789', 'Chicago', 0);

INSERT INTO Organization (OrganizationID, OrganizationName, OrgDescription, Email, PhoneNumber, LocatedAt, TotalEvents) VALUES 
    (1, 'Cans for Kids', 'Hey there! We collect cans of food from all over the country to give to those in need. Ending hunger one can of soup at a time!', 'charity1@email.org', '1234567890', 'New York, NY', 10),
    (2, 'Friends of Trees', 'Clean parks and clean water is what we are all about. Nature is for everyone.', 'charity2@email.com', '9876543210', 'Austin, TX', 5),
    (3, 'Mouse Rescue of Greater Boston', 'At MRGN, it is all about the little guys! We rescue mice across greater Boston and find them safe homes.', 'mouse@email.com', '1357924680', 'Boston, MA', 3),
    (4, 'Omlettes for Orcas', 'Seattle is known for their vibrant orca population. We are here to serve this beautiful species whatever they need.', 'orcas@email.com', '1236547809', 'Seattle, WA', 1),
    (5, 'Colorado Shelters United', 'We are the unification of all shelters across the state of Colorado.', 'csu@email.com', '1112223344', 'Boulder, CO', 2);

INSERT INTO MapLocation (LocationID, Longitude, Latitude, OrgAddress) VALUES
    (1, -73.94, 40.80, '221 E 122nd St, New York, NY'),
    (2, 30.26, -97.74, '456 Elm St, Austin, TX'),
    (3, -71.07, 42.34, '15 Hanson St, Boston, MA'),
    (4, -122.33, 47.61, '123 Main St, Seattle, WA'),
    (5, -105.264924, 40.022114, '2344 Spruce St, Boulder, CO');

INSERT INTO Event (EventID, OrganizationID, EventName, EventDescription, EventType, EventDate, EventTime, NumMaxVolunteers, RSVPs, LocationID) VALUES
    (1, 1, 'Charity1 Event Name', 'Charity1 Event Description.', 'Donation', '2024-11-01', '10:00:00', 50, 30, 1),
    (2, 2, 'Charity2 Event Name', 'Charity2 Event Description.', 'Volunteer', '2024-11-02', '09:00:00', 20, 15, 2);

INSERT INTO Post (UserID, PostImage, TimeOfPost, PostText) VALUES
    (1, 'food.jpg', '2024-11-03 14:30:00', 'Just had an awesome afternoon serving lunch to my good friends at Rosie''s Place! It''s always so nice to give people a hot meal, especially with the cold weather. They''re always looking for volunteers so make sure to stop by sometime.'),
    (1, 'clothes.jpg', '2024-11-03 18:30:00', 'Took Aunt Linda to the dropbox on North Ave to drop off her old clothes. You should''ve seen the clothes she found in the back of her closet. I haven''t seen bell bottoms like that since the 70s! Yikes!!!'),
    (2, 'volunteer.jpg', '2024-11-04 09:45:00', 'This year I decided to start volunteering at Apex for Youth. And I never could''ve imagined how lifechanging a decision it would be. It''s been so impactful to watch these kids learn and grow and I''m so honored to have a part in that. Here''s to another amazing year with Apex!'),
    (3, 'kitchen.jpg', '2024-11-05 11:06:00', 'Rosie''s place helped me out when I needed them, so happy to give back');

INSERT INTO Comments (PostID, UserID, PostedComment, TimeCommentedAt) VALUES
    (1, 2, 'Tell me next time you''re volunteering, I''ll go too!', '2024-11-03 15:00:00'),
    (2, 3, 'omg Aunt Linda''s bell bottoms... hope the next person loves them as much as she did!', '2024-11-03 20:00:00'),
    (2, 1, 'So cool :)', '2024-11-04 12:00:00'),
    (3, 3, 'So proud of you!', '2024-11-05 15:30:00'),
    (3, 1, 'I bet you''re the best mentor', '2024-11-05 15:45:00'),
    (3, 2, 'thanks everyone!', '2024-11-06 08:20:00'),
    (4, 1, 'Loved seeing you again, talk soon', '2024-11-07 22:01:00');

INSERT INTO SupplyRequest (RequestID, OrganizationID, ItemName, Quantity, SupplyDescription, LocationID) VALUES
    (1, 1, 'Canned Soup', 100, 'We are in need of cans of soup for our annual canned food drive. All proceeds will be donated to those in need. Please stop by any time with your cans. Chicken noodle, cream of mushroom, broccoli cheddar, we take it all! We greatly appreciate anything you are able to give.', 1),
    (2, 1, 'Canned Vegetables', 200, 'Do you have old cans lying around in your pantry? Please stop by anytime to drop them off with any of our volunteers. We are collecting cans of vegetables for our annual canned food drive. All proceeds will be donated to those in need. This is a great time to get rid of that extra baby corn!', 1),
    (3, 2, 'Trash Bags', 50, 'This weekend we are organizing to clean up the local park. There is a lot of trash especially on the north side by the playground so we need any trash bags we can to pick this up.', 2),
    (4, 3, 'Paper Towel Rolls', 30, 'We go through lots of paper towels when cleaning up after our rescue mice. Paper towels go a long way around here.', 3),
    (5, 3, 'Mouse Toys', 10, 'We have a new batch of rescue mice arriving on Saturday and would love to greet them with new toys. Wheels and houses and tubes are all welcome!', 3),
    (6, 3, 'Mouse Food', 25, 'Any bags of mouse food you can donate for our new mice would be really appreciated.', 3),
    (7, 4, 'Water Bottles', 60, 'Our volunteers will be out on the beaches this weekend so we are hoping to collect water bottles for them.', 4),
    (8, 5, 'Blankets', 10, 'With the cold weather coming, we are hoping to collect extra blankets for our residents.', 5),
    (9, 5, 'Socks', 150, 'Pairs of socks are really helpful for our residents in the cold months.', 5);

INSERT INTO FulfillRequest (FulfillID, RequestID, UserID, QuantityFulfilled, DateFulfilled) VALUES
    (1, 1, 1, 20, '2024-11-10'),
    (2, 2, 3, 10, '2024-11-11');

INSERT INTO RSVP (RSVPid, UserID, EventID, RSVPStatus) VALUES
    (1, 1, 1, 'Confirmed'),
    (2, 2, 2, 'Pending'),
    (3, 3, 1, 'Cancelled');   

