-- File: eventify_db.sql
-- Description: SQL script to create and populate the Eventify database.

-- ============================
-- Step 1: Create the Database
-- ============================
CREATE DATABASE IF NOT EXISTS eventify;
USE eventify;

-- ============================
-- Step 2: Create Tables
-- ============================

-- 1. Users Table: Stores user information.
CREATE TABLE IF NOT EXISTS User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role ENUM('regular user', 'admin') DEFAULT 'regular user',
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Events Table: Stores event details.
CREATE TABLE IF NOT EXISTS Event (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    EventName VARCHAR(255) NOT NULL,
    Description TEXT,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) DEFAULT 0.00,
    Category ENUM('Music', 'Tech', 'Sports', 'Arts') NOT NULL
);

-- 3. Bookings Table: Tracks user bookings.
CREATE TABLE IF NOT EXISTS Booking (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,
    EventID INT NOT NULL,
    UserID INT NOT NULL,
    Quantity INT NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    BookingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EventID) REFERENCES Event(EventID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

-- 4. Payments Table: Handles payment transactions.
CREATE TABLE IF NOT EXISTS Payment (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    BookingID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Paid', 'Pending', 'Refunded') DEFAULT 'Pending',
    FOREIGN KEY (BookingID) REFERENCES Booking(BookingID) ON DELETE CASCADE
);

-- ============================
-- Step 3: Insert Sample Data
-- ============================

-- Insert sample users.
INSERT INTO User (Name, Email, PasswordHash, Role)
VALUES
('John Doe', 'john.doe@example.com', MD5('password123'), 'regular user'),
('Jane Smith', 'jane.smith@example.com', MD5('securepass456'), 'admin');

-- Insert sample events.
INSERT INTO Event (EventName, Description, Date, Time, Location, Price, Category)
VALUES
('Music Fest 2024', 'A grand music festival.', '2024-07-10', '18:00:00', 'City Park', 50.00, 'Music'),
('Tech Conference', 'Explore the latest in technology.', '2024-09-15', '10:00:00', 'Tech Hub', 100.00, 'Tech');

-- Insert sample bookings.
INSERT INTO Booking (EventID, UserID, Quantity, TotalPrice)
VALUES
(1, 1, 2, 100.00), -- John Doe books 2 tickets for Music Fest
(2, 2, 1, 100.00); -- Jane Smith books 1 ticket for Tech Conference.

-- Insert sample payments.
INSERT INTO Payment (BookingID, Amount, Status)
VALUES
(1, 100.00, 'Paid'),
(2, 100.00, 'Pending');
