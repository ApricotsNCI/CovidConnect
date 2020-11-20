<?php
$server = "eu-cdbr-west-03.cleardb.net";
$user = "b66c12d2a6df51";
$pass = "42536d71";
$db = "heroku_ee0928b4ad437e0";

$conn = new mysqli($server, $user, $pass, $db);

$username = mysqli_real_escape_string($conn,$_POST['username']);
$passwordOne = mysqli_real_escape_string($conn,$_POST['passwordOne']);
$email = mysqli_real_escape_string($conn,$_POST['email']);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO users (username,password,Email)values($username,$passwordOne,$email)";

if ($conn->query($sql) === TRUE) {
  echo "The account had been created successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
