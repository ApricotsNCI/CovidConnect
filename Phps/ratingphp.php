<?php
$server = "eu-cdbr-west-03.cleardb.net";
$user = "b66c12d2a6df51";
$pass = "42536d71";

$db = "heroku_ee0928b4ad437e0";

$conn = new mysqli($server, $user, $pass, $db);

$username = $conn,$_POST['username'];
$usernameTwo = $conn,$_POST['usernameTwo'];
$rating = $conn,$_POST['rating'];
$connection = $conn,$_POST['connection'];

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
/* Gathering user ids */
$sql = "SELECT idusers FROM users WHERE username='$username'";
$result = mysqli_query($conn,$sql);
$sqlTwo = "SELECT idusers FROM users WHERE username='$usernameTwo'";
$resultTwo = mysqli_query($conn,$sqlTwo);
/*Inserting rating*/
$sqlThree ="INSERT INTO ratings(idUserOne,idUserTwo,starRating,connect)
VALUES('$result','$resultTwo','$rating','$connection')";

if ($conn->query($sqlThree) === TRUE) {
  echo "Rating logged!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

?>
