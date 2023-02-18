<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Headers: *');
include 'DBconnection.php';


if($_SERVER['REQUEST_METHOD'] === "POST"){
    $data = json_decode(file_get_contents("php://input"), true);
    $role = $data['role'];
    $name = $data['name'];
    $password = $data['password']; 
    $sql = "SELECT * FROM users WHERE name = '$name' AND password = '$password'";
    $result = mysqli_query($conn, $sql); 
    if(mysqli_num_rows($result) > 0){
        echo json_encode(array("status" => "exist"));
        exit();
    }
    

    $sql = "INSERT INTO users (name, password, role) VALUES ('$name', '$password', '$role')";
    $result = mysqli_query($conn, $sql);
     
        
    if($role === "teacher"){
        $sql = "SELECT id FROM users WHERE name = '$name' AND password = '$password'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        $id = $row['id'];
        $email = $data['email'];

        $sql = "SELECT * FROM teacher WHERE uid = '$id' or email = '$email'";
        $result = mysqli_query($conn, $sql); 
        if(mysqli_num_rows($result) > 0){
            echo json_encode(array("status" => "email already exist"));
            exit();
        }
         
        
        $sql = "INSERT INTO teacher (uid, email) VALUES ('$id', '$email')";
        $result = mysqli_query($conn, $sql);
        if($result){
            echo json_encode(array("status" => "success"));
        }else{
            echo json_encode(array("status" => "failed"));
        } 
    }
     
}

 

?>