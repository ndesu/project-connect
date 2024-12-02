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

INSERT INTO Post (PostID, UserID, Image, TimeOfPost) VALUES
    (1, 1, 'food.jpg', '2024-11-03 14:30:00'),
    (2, 2, 'help.jpg', '2024-11-04 09:45:00');

INSERT INTO Comment (CommentID, PostID, UserID, PostedComment, TimeCommentedAt) VALUES
    (1, 1, 2, 'hello', '2024-11-01 15:00:00'),
    (2, 2, 3, 'hello!', '2024-11-02 10:00:00');

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

