<?php

$server = "eu-cdbr-west-03.cleardb.net";
$user = "b66c12d2a6df51";
$pass = "42536d71";
$db = "heroku_ee0928b4ad437e0";
$url = "https://covid-connect-heroku.herokuapp.com/Webpages/home.html";

$conn = new mysqli($server, $user, $pass, $db);

$username = mysqli_real_escape_string($conn,$_POST['username']);
$password = mysqli_real_escape_string($conn,$_POST['password']);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT idusers FROM users WHERE username = '$username' and password = '$password'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
$active = $row['active'];

$count = mysqli_num_rows($result);

if($count == 1) {
         echo $username;
				 function redirect($url){
					 ob_start();
					 header('Location: '.$url);
					 ob_end_flush();
					 die();
				 }
      }else {
         echo false;
}
?>
