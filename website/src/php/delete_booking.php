<?php
include 'db_connection.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$bookingID = $_POST['booking_id'];

$sql = "DELETE FROM Booking WHERE BookingID = ?";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([$bookingID]);
    echo json_encode(['message' => 'Booking deleted successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete booking: ' . $e->getMessage()]);
}
?>