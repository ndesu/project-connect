-- Project Connect Insert files

INSERT INTO Users (FullName, Email, PasswordHash, LocatedAt, RSVPs) VALUES  
    ('Nidhi Desu', 'nidhidesu@gmail.com', 'password123', 'New York, NY', 0),
    ('Xena Maldonado', 'xenamaldonado@gmail.com', 'password456', 'Los Angeles, CA', 0),
    ('Adria Orenstein', 'adriaorenstein@gmail.com', 'password789', 'Chicago, IL', 0);

INSERT INTO Organizations (OrganizationName, OrgDescription, Email, PhoneNumber, PasswordHash, LocatedAt, TotalEvents) VALUES 
    ('Charity1', 'Description of Charity1.', 'charity1@email.org', '1234567890', 'password123', 'New York, NY', 10),
    ('Charity2', 'Description of Charity2.', 'charity2@email.com', '9876543210', 'password234', 'Austin, TX', 5);

INSERT INTO Events (OrganizationID, EventName, EventDescription, EventType, EventDate, EventTime, NumMaxVolunteers, RSVPs) VALUES
    (1, 'Charity1 Event Name', 'Charity1 Event Description.', 'Donation', '2024-11-01', '10:00:00', 50, 30),
    (2, 'Charity2 Event Name', 'Charity2 Event Description.', 'Volunteer', '2024-11-02', '09:00:00', 20, 15);

INSERT INTO MapLocation (Longitude, Latitude, OrgAddress) VALUES
    (-122.33, 47.61, '123 Main St, Seattle, WA'),
    (-97.74, 30.26, '456 Elm St, Austin, TX');

INSERT INTO Posts (UserID, PostImage, TimeOfPost, PostText) VALUES
    (1, 'food.jpg', '2024-11-03 14:30:00', 'Check out this food!'),
    (2, 'help.jpg', '2024-11-04 09:45:00', 'We are in need of some help.');

INSERT INTO Comments (PostID, UserID, PostedComment, TimeCommentedAt) VALUES
    (1, 2, 'hello', '2024-11-01 15:00:00'),
    (2, 3, 'hello!', '2024-11-02 10:00:00');

INSERT INTO SupplyRequest (OrganizationID, ItemName, Quantity, SupplyDescription, RequestAddress) VALUES
    (1, 'Canned Food', 100, 'Canned items needed.', '123 Main St, Seattle, WA'),
    (2, 'Trash Bags', 50, 'Trash bags for garbage.', '456 Elm St, Austin, TX');

INSERT INTO FulfillRequest (RequestID, UserID, QuantityFulfilled, DateFulfilled) VALUES
    (1, 1, 20, '2024-11-10'),
    (2, 3, 10, '2024-11-11');

INSERT INTO RSVP (UserID, EventID, RSVPStatus) VALUES
    (1, 1, 'Confirmed'),
    (2, 2, 'Pending'),
    (3, 1, 'Cancelled');   

