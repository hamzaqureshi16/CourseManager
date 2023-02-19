<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
include 'DBconnection.php';

$username = $_POST['username'];
$password = $_POST['password'];

// Prepare and execute the query using parameters to prevent SQL injection attacks
$sql = "SELECT * FROM users WHERE name = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
   echo 'Login Successfull';
} else {
  echo "Invalid username or password";
}

$stmt->close();
?>