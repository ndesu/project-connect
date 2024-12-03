-- Project Connect Insert files

INSERT INTO Users (UserID, FullName, Email, Password, LocatedAt, RSVPs) VALUES  
    (1, 'Nidhi Desu', 'nidhidesu@gmail.com', 'password123', 'New York', 0),
    (2, 'Xena Maldonado', 'xenamaldonado@gmail.com', 'password456', 'Los Angeles', 0),
    (3, 'Adria Orenstein', 'adriaorenstein@gmail.com', 'password789', 'Chicago', 0);

INSERT INTO Organization (OrganizationID, OrganizationName, Description, Email, PhoneNumber, LocatedAt, TotalEvents) VALUES 
    (1, 'Charity1', 'Description of Charity1.', 'charity1@email.org', '1234567890', 'New York, NY', 10),
    (2, 'Charity2', 'Description of Charity2.', 'charity2@email.com', '9876543210', 'Austin, TX', 5);

INSERT INTO MapLocation (LocationID, Longitude, Latitude, Address) VALUES
    (1, -122.33, 47.61, '123 Main St, Seattle, WA'),
    (2, -97.74, 30.26, '456 Elm St, Austin, TX');

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

INSERT INTO SupplyRequest (RequestID, OrganizationID, ItemName, Quantity, Description, LocationID) VALUES
    (1, 1, 'Canned Food', 100, 'Canned items needed.', 1),
    (2, 2, 'Trash Bags', 50, 'Trash bags for garbage.', 2);

INSERT INTO FulfillRequest (FulfillID, RequestID, UserID, QuantityFulfilled, DateFulfilled) VALUES
    (1, 1, 1, 20, '2024-11-10'),
    (2, 2, 3, 10, '2024-11-11');

INSERT INTO RSVP (RSVPid, UserID, EventID, Status) VALUES
    (1, 1, 1, 'Confirmed'),
    (2, 2, 2, 'Pending'),
    (3, 3, 1, 'Cancelled');   

