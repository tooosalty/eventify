-- Group Members:   Branson Kouaya and Hendrick Sonfack
-- eventify_db.sql: Complete Database Implementation for Eventify

-- DROP EXISTING DATABASE TO START CLEAN (if necessary)
-- DROP DATABASE IF EXISTS eventify;

-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS eventify;
USE eventify;

-- USERS TABLE
-- Stores user details and their roles in the system.
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each user
    Name VARCHAR(255) NOT NULL, -- User's full name
    Email VARCHAR(255) UNIQUE NOT NULL, -- Unique email for authentication
    PasswordHash VARCHAR(255) NOT NULL, -- Encrypted password for security
    Role ENUM('user', 'admin') DEFAULT 'user', -- Role for access control
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for user registration
) ENGINE=InnoDB;

-- EVENTS TABLE
-- Stores details of events created by admins.
CREATE TABLE IF NOT EXISTS Events (
    EventID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each event
    Title VARCHAR(255) NOT NULL, -- Event title
    Description TEXT, -- Detailed description of the event
    Date DATE NOT NULL, -- Event date
    Location VARCHAR(255) NOT NULL, -- Event location
    CreatedBy INT NOT NULL, -- Admin who created the event
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Event creation timestamp
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID) ON DELETE CASCADE -- Foreign key to Users
) ENGINE=InnoDB;

-- BOOKINGS TABLE
-- Stores bookings made by users for events.
CREATE TABLE IF NOT EXISTS Bookings (
    BookingID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each booking
    UserID INT NOT NULL, -- User who made the booking
    EventID INT NOT NULL, -- Event being booked
    BookingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the booking was made
    Seats INT DEFAULT 1, -- Number of seats booked
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE, -- Links to Users
    FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE -- Links to Events
) ENGINE=InnoDB;

-- PAYMENTS TABLE
-- Tracks payments made by users for their bookings.
CREATE TABLE IF NOT EXISTS Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each payment
    BookingID INT NOT NULL, -- Links to a booking
    Amount DECIMAL(10, 2) NOT NULL, -- Amount paid
    PaymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the payment was made
    PaymentMethod ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL, -- Payment method used
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID) ON DELETE CASCADE -- Links to Bookings
) ENGINE=InnoDB;

-- SAMPLE DATA INSERTION
-- Add a sample admin user for testing
INSERT INTO Users (Name, Email, PasswordHash, Role) VALUES
('Admin User', 'admin@eventify.com', 'samplehash', 'admin');

-- Add sample events
INSERT INTO Events (Title, Description, Date, Location, CreatedBy) VALUES
('Tech Summit 2025', 'A summit for tech enthusiasts.', '2025-02-20', 'San Francisco, CA', 1),
('Music Festival 2025', 'An outdoor music festival.', '2025-03-15', 'Los Angeles, CA', 1);

-- Add sample bookings
INSERT INTO Bookings (UserID, EventID, Seats) VALUES
(1, 1, 2),
(1, 2, 4);

-- Add sample payments
INSERT INTO Payments (BookingID, Amount, PaymentMethod) VALUES
(1, 200.00, 'credit_card'),
(2, 400.00, 'paypal');

-- ADVANCED QUERY FOR REPORTING
-- Generate a report of bookings with user and event details
SELECT 
    Users.Name AS UserName,
    Users.Email AS UserEmail,
    Events.Title AS EventTitle,
    Events.Date AS EventDate,
    Bookings.Seats AS SeatsBooked,
    Payments.Amount AS AmountPaid,
    Payments.PaymentMethod AS PaymentMethod
FROM Bookings
JOIN Users ON Bookings.UserID = Users.UserID
JOIN Events ON Bookings.EventID = Events.EventID
LEFT JOIN Payments ON Bookings.BookingID = Payments.BookingID
ORDER BY Events.Date, Users.Name;

-- Comments:
-- 1. Use of ENUM for Role and PaymentMethod ensures consistency in data entry.
-- 2. Foreign key constraints enforce relational integrity.
-- 3. Indexing on primary keys improves query performance.
-- 4. The reporting query demonstrates the use of JOINs across multiple tables to derive meaningful insights.
