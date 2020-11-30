<?php
$server = "eu-cdbr-west-03.cleardb.net";
$user = "b66c12d2a6df51";
$pass = "42536d71";
$db = "heroku_ee0928b4ad437e0";

$conn = new mysqli($server, $user, $pass, $db);

$username = mysqli_real_escape_string($conn,$_POST['username']);
/*$username = "testuser";*/

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$arr = array();

$sql = "SELECT * FROM users WHERE username='$username'";

if ($conn->query($sql) === TRUE) {
  array_push($arr,$row['fullName']);
  array_push($arr,$row['dob']);
  array_push($arr,$row['gender']);
  array_push($arr,$row['email']);
  array_push($arr,$row['password']);
  echo json_encode($arr);
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
