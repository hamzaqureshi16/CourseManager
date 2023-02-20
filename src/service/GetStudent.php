<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
include 'DBconnection.php';

$id = $_GET['id'];
$sql = "select * from registered_courses where student_id = '$id'";
$result = mysqli_query($conn, $sql);
$data = array("status"=>"null");

if(mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    $data["status"] = 'ok';
echo json_encode($data);
}
else{
    $data["status"] = 'failed';
    echo json_encode($data);
}





?>