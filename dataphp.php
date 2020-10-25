<?php

$server = "eu-cdbr-west-03.cleardb.net";
$username = "b66c12d2a6df51";
$password = "42536d71";
$db = "heroku_ee0928b4ad437e0";

$user = $_POST[username];
$pass = $_POST[password];

$conn = new mysqli($server, $username, $password, $db);

if ($conn->connect_error) {
	echo $server+" "+$username+" "+$password+" "+$db;
	die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM `users` WHERE `username`='".$conn->real_escape_string($user)."' and `password`='".$conn->real_escape_string($pass)."'";

$result = $conn->query($sql);

$row = mysqli_fetch_array($result,MYSQLI_ASSOC);

$active = $row['active'];

$count = mysqli_num_rows($result);

if($count == 1) {
         $echo "Login successful! Welcome ".$user."!";
      }else {
         $echo "Your Login Name or Password is invalid";
}
?>
