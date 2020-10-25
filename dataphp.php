<?php

$servername = "eu-cdbr-west-03.cleardb.net";
$username = "b66c12d2a6df51";
$password = "42536d71";
$dbname = "CovidConnect Database";

$user = $_POST[username];
$pass = $_POST[password];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$result = mysql_query("SELECT * FROM users WHERE username = '$user' AND password = '$pass'")
						or die("Failed to query database ".mysql_error());

$row = mysql_fetch_array($result);
if($row['username']==$user && $row['password']==$pass){
	echo "Login success! Welcome ".$row['username'];
}else{
	echo "Failed to login.";
}
?>
