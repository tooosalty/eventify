<?php
include 'db_connection.php';

$eventID = $_POST['event_id'];
$userID = $_POST['user_id'];
$quantity = $_POST['quantity'];
$totalPrice = $_POST['total_price'];

$sql = "INSERT INTO Booking (EventID, UserID, Quantity, TotalPrice) VALUES (?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$eventID, $userID, $quantity, $totalPrice])) {
    echo "Booking successful!";
} else {
    echo "Booking failed!";
}
?>
