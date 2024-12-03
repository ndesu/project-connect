-- Project Connect Create File

CREATE TABLE IF NOT EXISTS Users (
    UserID SERIAL PRIMARY KEY,
    FullName VARCHAR(50),
    Email VARCHAR(50) UNIQUE,
    PasswordHash VARCHAR(255),
    LocatedAt VARCHAR(50),
    RSVPs INT
);

CREATE TABLE IF NOT EXISTS Organizations (
    OrganizationID SERIAL PRIMARY KEY,
    OrganizationName VARCHAR(50),
    OrgDescription TEXT,
    Email VARCHAR(50) UNIQUE,
    PhoneNumber VARCHAR(10),
    PasswordHash VARCHAR(255),
    LocatedAt VARCHAR(50),
    TotalEvents INT
);

CREATE TABLE IF NOT EXISTS MapLocation (
    LocationID SERIAL PRIMARY KEY,
    Longitude DECIMAL(10, 6),
    Latitude DECIMAL(10, 6),
    OrgAddress VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Events (
    EventID SERIAL PRIMARY KEY,
    OrganizationID INT,
    EventName VARCHAR(50),
    EventDescription TEXT,
    EventType VARCHAR(50),
    EventDate DATE,
    EventTime TIME,
    NumMaxVolunteers INT,
    RSVPs INT,
    LocationID INT, 
    FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
    FOREIGN KEY (LocationID) REFERENCES MapLocation(LocationID)
);

CREATE TABLE IF NOT EXISTS Posts (
    PostID SERIAL PRIMARY KEY,
    UserID INT,
    PostImage VARCHAR(50),
    TimeOfPost TIMESTAMP,
    PostText VARCHAR(500),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS Comments (
    CommentID SERIAL PRIMARY KEY,
    PostID INT,
    UserID INT,
    PostedComment VARCHAR(250),
    TimeCommentedAt TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS SupplyRequest (
    RequestID SERIAL PRIMARY KEY,
    OrganizationID INT,
    ItemName VARCHAR(50),
    Quantity INT,
    SupplyDescription TEXT,
    LocationID INT, 
    FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
    FOREIGN KEY (LocationID) REFERENCES MapLocation(LocationID)
);

CREATE TABLE IF NOT EXISTS FulfillRequest (
    FulfillID SERIAL PRIMARY KEY,
    RequestID INT,
    UserID INT,
    QuantityFulfilled INT,
    DateFulfilled DATE,
    FOREIGN KEY (RequestID) REFERENCES SupplyRequest(RequestID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS RSVP (
    RSVPid SERIAL PRIMARY KEY,
    UserID INT,
    EventID INT,
    RSVPStatus VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (EventID) REFERENCES Events(EventID)
);