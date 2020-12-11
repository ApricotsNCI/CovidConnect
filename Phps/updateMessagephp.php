<?php
$server = "eu-cdbr-west-03.cleardb.net";
$user = "b66c12d2a6df51";
$pass = "42536d71";

$db = "heroku_ee0928b4ad437e0";

$conn = new mysqli($server, $user, $pass, $db);

$username = mysqli_real_escape_string($conn,$_POST['username']);
$fullName = mysqli_real_escape_string($conn,$_POST['fullName']);
$userMessage = mysqli_real_escape_string($conn,$_POST['userMessage']);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE chatroulette SET userMessage='$userMessage', WHERE username='$username'";

if ($conn->query($sql) === TRUE) {
  echo "The messgae was sent successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


?>
