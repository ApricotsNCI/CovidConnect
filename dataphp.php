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

$sql = "SELECT * FROM `users` WHERE `username`='".$conn->real_escape_string($user)."' AND `password`='".$conn->real_escape_string($pass)."'";

if($result = $conn->query($sql)) {
    foreach($result as $row) {
        echo "Login successful!";
    }
} else {
    throw new Exception($conn->error);
}

?>
