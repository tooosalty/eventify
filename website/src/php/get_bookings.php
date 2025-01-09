<?php
include 'db_connection.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$userID = $_SESSION['user']['UserID'];

$sql = "SELECT Booking.BookingID, Event.EventName, Booking.Quantity, Booking.TotalPrice, Booking.BookingDate
        FROM Booking
        INNER JOIN Event ON Booking.EventID = Event.EventID
        WHERE Booking.UserID = ?";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([$userID]);
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($bookings);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch bookings: ' . $e->getMessage()]);
}
?>
