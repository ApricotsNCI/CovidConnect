<?php

$server = "eu-cdbr-west-03.cleardb.net";
$username = "b66c12d2a6df51";
$password = "42536d71";
$db = "heroku_ee0928b4ad437e0";

$conn = new mysqli($server, $username, $password, $db);

$user = $conn->real_escape_string($_POST[username]);
$pass = $conn->real_escape_string($_POST[password]);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id FROM admin WHERE username = '$user' and passcode = '$pass'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
$active = $row['active'];

$count = mysqli_num_rows($result);

if($count == 1) {
         echo "Login successful! Welcome "+$user+"!";
      }else {
         echo "Your Login Name or Password is invalid";
}

?>
