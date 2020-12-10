<?php

$server = "eu-cdbr-west-03.cleardb.net";
$user = "b66c12d2a6df51";
$pass = "42536d71";

$db = "heroku_ee0928b4ad437e0";

session_start();

$query = "
SELECT * FROM login
WHERE user_id != '".$_SESSION['user_id']."'
";

$statement = $connect->prepare($query);

$statement->execute();

$result = $statement->fetchAll();

$output = '
<table class="table table-bordered table-striped">
 <tr>
  <td>Username</td>
  <td>Status</td>
  <td>Action</td>
 </tr>
';

foreach($result as $row)
{
 $output .= '
 <tr>
  <td>'.$row['username'].'</td>
  <td></td>
  <td><button type="button" class="btn btn-info btn-xs start_chat" data-touserid="'.$row['user_id'].'" data-tousername="'.$row['username'].'">Start Chat</button></td>
 </tr>
 ';
}

$output .= '</table>';

echo $output;

?>
