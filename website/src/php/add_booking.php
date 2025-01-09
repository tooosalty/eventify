<?php
include 'db_connection.php';
header('Content-Type: application/json');

$userID = $_POST['user_id'];
$eventID = $_POST['event_id'];
$quantity = $_POST['quantity'];
$totalPrice = $_POST['total_price'];

$sql = "INSERT INTO Booking (UserID, EventID, Quantity, TotalPrice) VALUES (?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([$userID, $eventID, $quantity, $totalPrice]);
    echo json_encode(['message' => 'Booking successful']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to book event: ' . $e->getMessage()]);
}
?>
