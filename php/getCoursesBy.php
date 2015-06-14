<?php
    header("access-control-allow-origin: *");
    require_once 'login.php';
    require_once 'processAndSend.php';
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error) die($conn->connect_error);
    if(isset($_POST['order'])) {
        $dataReceived = $_POST['order'];
    } else {
        echo json_encode("Errore");
        die;
    }
    switch ($dataReceived) {
        case "level":
        $request = "SELECT courses.name, levels.difficulty, page FROM courses JOIN levels on courses.difficulty = levels.id ORDER BY levels.id";
        break;
        case "category":
        $request = "SELECT name, category, page FROM courses ORDER BY category";
        break;
    }
    processAndSend($conn, $request);
?>