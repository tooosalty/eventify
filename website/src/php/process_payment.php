<?php
include 'db_connection.php';
header('Content-Type: application/json');

$bookingID = $_POST['booking_id'];
$amount = $_POST['amount'];

$sql = "INSERT INTO Payment (BookingID, Amount, Status) VALUES (?, ?, 'Paid')";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([$bookingID, $amount]);
    echo json_encode(['message' => 'Payment processed successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to process payment: ' . $e->getMessage()]);
}
?>
