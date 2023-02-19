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
        echo json_encode(array("status" => "user already exists"));
        exit();
    }
    
    

    $sql = "INSERT INTO users (name, password, role) VALUES ('$name', '$password', '$role')";
    $result = mysqli_query($conn, $sql);

    
    $sql = "SELECT id FROM users WHERE name = '$name' AND password = '$password'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $id = $row['id'];
        
    if($role === "teacher"){
        $email = $data['email'];
        $sql1 = "SELECT * FROM teacher WHERE email = '$email'";
        $result1 = mysqli_query($conn, $sql1);
        if( mysqli_num_rows($result1)>0){
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
    elseif($role === 'student'){
       $registration = $data['registration'];
       $cgpa = $data['cgpa'];
        $semester = $data['semester'];
        $sql = "INSERT INTO student (uid,reg,cgpa,sem) VALUES ('$id','$registration','$cgpa','$semester')";
        $result = mysqli_query($conn, $sql);
        if($result){
            echo json_encode(array("status" => "success"));
        }else{
            echo json_encode(array("status" => "failed"));
        } 
    }
    else{
        echo json_encode(array("status" => "failed"));
        
    }
     
}
else{
    echo $_POST["username"];
}
 

?>