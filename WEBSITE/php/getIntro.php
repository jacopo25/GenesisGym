<?php
    header("access-control-allow-origin: *");
    require_once 'login.php';
    require_once 'processAndSend.php';
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error) die($conn->connect_error);
    if(isset($_POST['page'])) {
        $page = $_POST['page'];
    } else {
        echo json_encode("Errore");
        die;
    }
    $request = "SELECT description FROM intro WHERE page = '$page'";
    processAndSend($conn, $request);
?>