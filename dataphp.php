<?php
$url = parse_url(getenv("mysql://b66c12d2a6df51:42536d71@eu-cdbr-west-03.cleardb.net/heroku_ee0928b4ad437e0?reconnect=true"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

$user = $_POST[username];
$pass = $_POST[password];

$conn = new mysqli($server, $username, $password, $db);

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
