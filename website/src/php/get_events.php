<?php
include 'db_connection.php';

header('Content-Type: application/json');

try {
    // Fetch all events from the Event table
    $sql = "SELECT EventID, EventName, Category, Date, Price FROM Event";
    $stmt = $pdo->query($sql);
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'data' => $events]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch events']);
}
?>
