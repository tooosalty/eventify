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

$sql = "SELECT Payment.PaymentID, Booking.BookingID, Payment.Amount, Payment.PaymentDate, Payment.Status
        FROM Payment
        INNER JOIN Booking ON Payment.BookingID = Booking.BookingID
        WHERE Booking.UserID = ?";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([$userID]);
    $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($payments);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch payments: ' . $e->getMessage()]);
}
?>
