<?php
    header("access-control-allow-origin: *");
    require_once 'login.php';
    require_once 'processAndSend.php';
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error) die($conn->connect_error);
    $request = "SELECT * FROM contacts";
    processAndSend($conn, $request);
?>