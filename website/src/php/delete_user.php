<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connection.php';

session_start();
$userId = $_SESSION['user']['id'] ?? null;

if (!$userId) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $sql = "DELETE FROM User WHERE UserID = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);

    session_destroy(); // Logout the user after deletion
    echo json_encode(['success' => true, 'message' => 'Account deleted successfully.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete account: ' . $e->getMessage()]);
}
?>