<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connection.php';

$name = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_STRING);
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$password = trim($_POST['password'] ?? '');

if (!$name || !$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required.']);
    exit;
}

try {
    // Hash the password for security
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insert user into the database
    $sql = "INSERT INTO User (Name, Email, PasswordHash) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name, $email, $passwordHash]);

    echo json_encode(['success' => true, 'redirect' => '/website/src/pages/login.html']);
    exit;
} catch (PDOException $e) {
    if ($e->getCode() === '23000') { // Duplicate email error
        http_response_code(409);
        echo json_encode(['error' => 'Email already registered.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
    }
}
?>