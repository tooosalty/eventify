<?php
include 'db_connection.php';

$sql = "SELECT * FROM Event WHERE Date >= CURDATE() ORDER BY Date";
$stmt = $pdo->query($sql);
$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($events);
?>
