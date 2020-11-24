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

$sql = "SELECT idusers FROM users WHERE username = '$username'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
$active = $row['active'];

$count = mysqli_num_rows($result);

if($count == 1) {
   	echo "Error the username is already taken please create an different username.";
}else {
	$sqlTwo = "INSERT INTO users (username,password,Email)
	VALUES('$username','$passwordOne','$email')";

	if ($conn->query($sqlTwo) === TRUE) {
	  echo "The account had been created successfully!";
	} else {
	  echo "Error: " . $sql . "<br>" . $conn->error;
	}
}
?>
