<?php
$server = "eu-cdbr-west-03.cleardb.ne";
$user = "b66c12d2a6df51";
$pass = "42536d71";

$db = "heroku_ee0928b4ad437e0";

$conn = new mysqli($server, $user, $pass, $db);

$username = mysqli_real_escape_string($conn,$_POST['username']);


if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$arr = array();

$sql = "SELECT * FROM users WHERE username='$username'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);

if ($result == TRUE) {
	if($row['fullName']==""){
		array_push($arr,"User has no name.");
	}else{
		array_push($arr,$row['fullName']);
	}
  if($row['dob']==""){
		array_push($arr,"User has no birthday.");
	}else{
		array_push($arr,$row['dob']);
	}
	if($row['user_bio']==""){
		array_push($arr,"User has no bio!");
	}else{
		array_push($arr,$row['user_bio']);
	}
  echo json_encode($arr);
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
