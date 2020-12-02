<?php
    $pathToImage = "/new/file/path/unique/345908.png";
    move_uploaded_files($_FILES['file']['tmp_name'], $pathToImage);
?>
