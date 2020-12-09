<?php
/*$server = "eu-cdbr-west-03.cleardb.ne";
$user = "b66c12d2a6df51";
$pass = "42536d71";*/
$server = "127.0.0.1:3307";
$user = "covidconnect";
$pass = "Eamonn00";
$db = "heroku_ee0928b4ad437e0";

$conn = new mysqli($server, $user, $pass, $db);

$username = mysqli_real_escape_string($conn,$_POST['username']);
$fullName = mysqli_real_escape_string($conn,$_POST['fullName']);
$dob = mysqli_real_escape_string($conn,$_POST['dob']);
$gender = mysqli_real_escape_string($conn,$_POST['gender']);
$email =  mysqli_real_escape_string($conn,$_POST['email']);
$password = mysqli_real_escape_string($conn,$_POST['password']);
$bio = mysqli_real_escape_string($conn,$_POST['bio']);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE users SET fullName='$fullName', dob='$dob', gender='$gender', email='$email', password='$password', user_bio='$bio' WHERE username='$username'";

if ($conn->query($sql) === TRUE) {
  echo "The account had been updated successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


?>
