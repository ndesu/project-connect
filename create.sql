-- Project Connect Create File

CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    FullName VARCHAR(50),
    Email VARCHAR(50) UNIQUE,
    Password VARCHAR(50),
    LocatedAt VARCHAR(50),
    RSVPs INT
);

CREATE TABLE Organization (
    OrganizationID INT PRIMARY KEY,
    OrganizationName VARCHAR(50),
    Description TEXT,
    Email VARCHAR(50),
    PhoneNumber VARCHAR(10),
    LocatedAt VARCHAR(50),
    TotalEvents INT
);

CREATE TABLE MapLocation (
    LocationID INT PRIMARY KEY,
    Longitude DECIMAL(10, 6),
    Latitude DECIMAL(10, 6),
    Address VARCHAR(75)
);

CREATE TABLE Event (
    EventID INT PRIMARY KEY,
    OrganizationID INT,
    EventName VARCHAR(50),
    EventDescription TEXT,
    EventType VARCHAR(50),
    EventDate DATE,
    EventTime TIME,
    NumMaxVolunteers INT,
    RSVPs INT,
    LocationID INT, 
    FOREIGN KEY (OrganizationID) REFERENCES Organization(OrganizationID),
    FOREIGN KEY (LocationID) REFERENCES MapLocation(LocationID)
);

CREATE TABLE Post (
    PostID INT PRIMARY KEY,
    UserID INT,
    Image VARCHAR(50),
    TimeOfPost TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Comment (
    CommentID INT PRIMARY KEY,
    PostID INT,
    UserID INT,
    PostedComment VARCHAR(250),
    TimeCommentedAt TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Post(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE SupplyRequest (
    RequestID INT PRIMARY KEY,
    OrganizationID INT,
    ItemName VARCHAR(50),
    Quantity INT,
    Description TEXT,
    LocationID INT, 
    FOREIGN KEY (OrganizationID) REFERENCES Organization(OrganizationID),
    FOREIGN KEY (LocationID) REFERENCES MapLocation(LocationID)
);

CREATE TABLE FulfillRequest (
    FulfillID INT PRIMARY KEY,
    RequestID INT,
    UserID INT,
    QuantityFulfilled INT,
    DateFulfilled DATE,
    FOREIGN KEY (RequestID) REFERENCES SupplyRequest(RequestID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE RSVP (
    RSVPid INT PRIMARY KEY,
    UserID INT,
    EventID INT,
    Status VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
);