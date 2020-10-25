<?php

$username = $_POST['username'];
$password = $_POST['password'];

$username = stripcslashes($username);
$password = stripcslashes($password);
$username = mysql_real_escape_string($username);
$password = mysql_real_escape_string($password);

mysql_connect("eu-cdbr-west-03.cleardb.net","b66c12d2a6df51", "42536d71");
mysql_select_db("heroku_ee0928b4ad437e0");

$result = mysql_query("SELECT * FROM users WHERE username = '$username' AND password = '$password'")
						or die("Failed to query database ".mysql_error());

$row = mysql_fetch_array($result);
if($row['username']==$username && $row['password']==$password){
	echo "Login success! Welcome ".$row['username'];
}else{
	echo "Failed to login.";
}
?>
