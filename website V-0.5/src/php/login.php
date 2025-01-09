<?php
include 'db_connection.php';

$email = $_POST['email'];
$password = md5($_POST['password']);

$sql = "SELECT * FROM User WHERE Email = ? AND PasswordHash = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email, $password]);
$user = $stmt->fetch();

if ($user) {
    session_start();
    $_SESSION['user'] = $user;
    echo "Login successful!";
} else {
    echo "Invalid credentials!";
}
?>
