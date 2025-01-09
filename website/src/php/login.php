<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connection.php';

session_start([
    'cookie_lifetime' => 86400, // 1 day
    'cookie_httponly' => true,
    'use_strict_mode' => true,
]);

header('Content-Type: application/json');

$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$password = trim($_POST['password'] ?? '');

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required.']);
    exit;
}

try {
    // Fetch user from database
    $sql = "SELECT * FROM User WHERE Email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['PasswordHash'])) {
        // Set session and return success
        $_SESSION['user'] = [
            'id' => $user['UserID'], // Replace with correct column name
            'name' => $user['Name'],
            'email' => $user['Email'],
        ];

        error_log('User logged in: ' . $user['Email']); // Debug log
        echo json_encode(['success' => true, 'redirect' => '/website/src/pages/dashboard.html']);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password.']);
    }
} catch (PDOException $e) {
    error_log('Login error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An unexpected error occurred. Please try again.']);
}
?>