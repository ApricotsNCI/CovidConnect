<?php

$username = $_POST['username'];
$password = $_POST['password'];

$username = stripcslashes($username);
$password = stripcslashes($password);
$username = mysql_real_escape_string($username);
$password = mysql_real_escape_string($password);

mysql_connect("localhost:8081","root", "");
mysql_select_db("covid_connect");

$result = mysql_query("SELECT * FROM users WHERE username = '$username' AND password = '$password'")
						or die("Failed to query database ".mysql_error());

$row = mysql_fetch_array($result);
if($row['username']==$username && $row['password']==$password){
	echo "Login success! Welcome ".$row['username'];
}else{
	echo "Failed to login.";
}
?>
