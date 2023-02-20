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
//extract the result


if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $ret = array("role"=>$row['role'],
    "id"=>$row['id']
);

    echo json_encode($ret);
} else {
  echo "Invalid username or password";
}

$stmt->close();
?>