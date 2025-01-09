<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connection.php';

session_start();
$userId = $_SESSION['user']['id'] ?? null;
$eventId = $_POST['eventId'] ?? null;

if (!$userId || !$eventId) {
    http_response_code(400);
    echo json_encode(['error' => 'User or event not found.']);
    exit;
}

try {
    $sql = "INSERT INTO Bookings (UserID, EventID) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId, $eventId]);

    echo json_encode(['success' => true, 'message' => 'Event booked successfully.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to book event: ' . $e->getMessage()]);
}
?>