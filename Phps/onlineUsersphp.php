<?php
$server = "eu-cdbr-west-03.cleardb.net";
$user = "b66c12d2a6df51";
$pass = "42536d71";

$db = "heroku_ee0928b4ad437e0";

$conn = new mysqli($server, $user, $pass, $db);

$username = mysqli_real_escape_string($conn,$_POST['username']);


if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}


$sql    = "SELECT * FROM onlineUsers WHERE session='$session'";
$result = mysqli_query($conn, $sql);
$count  = mysqli_num_rows($result);

//If count is 0 , then enter the values
if ($count == "0") {
  $sql1    = "INSERT INTO onlineUsers(session, time)VALUES('$session', '$time')";
  $result1 = mysqli_query($conn, $sql1);
} else {
  $sql2    = "UPDATE onlineUsers SET time='$time' WHERE session = '$session'";
  $result2 = mysqli_query($conn, $sql2);
}

$sql3              = "SELECT * FROM onlineUsers";
$result3           = mysqli_query($conn, $sql3);
$count_user_online = mysqli_num_rows($result3);
echo "<b>Users Online : </b> $count_user_online ";

// after 5 minutes, session will be deleted
$sql4    = "DELETE FROM onlineUsers WHERE time<$time_check";
$result4 = mysqli_query($conn, $sql4);

//To see the result run this script in multiple browser.
mysqli_close($conn);
?>
