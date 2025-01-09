<?php
$host = 'localhost';
$dbname = 'eventify';
$username = 'root';
$password = ''; // Leave blank for XAMPP on Mac
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>