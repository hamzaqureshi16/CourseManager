<?php
header('Access-Control-Allow-Origin: *');
include 'DBconnection.php';


if($_SERVER['REQUEST_METHOD'] === "POST"){
    $name = $_POST['name'];
$email = $_POST['email'];


//check if email already exists in db
$sql = "SELECT * FROM testtable WHERE email = '$email'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    echo "Email already exists";
    exit();
}
else{
    
$sql = "INSERT INTO testtable (name, email) VALUES ('$name', '$email')";
$result = mysqli_query($conn, $sql);
echo "saved";
}
}
elseif($_SERVER['REQUEST_METHOD'] === "GET"){
    $sql = "SELECT * FROM testtable";
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_assoc($result)){
        $data[] = $row;
    }
    echo json_encode($data);
    
}
 

?>