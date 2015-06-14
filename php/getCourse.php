<?php
    header("access-control-allow-origin: *");
    require_once 'login.php';
    require_once 'processAndSend.php';
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error) die($conn->connect_error);
    if(isset($_POST['name']) && isset($_POST['what'])) {
        $name = $_POST['name'];
        $what = $_POST['what'];
    } else {
        echo json_encode("Errore");
        die;
    }
    if($what == "list") {
        $request = "SELECT name, page FROM courses ORDER BY name";
    } else if($what == "generic") {
        $request = "SELECT * FROM courses WHERE name = '$name'";   
    } else if($what == "relation") {
        $request = "SELECT name, surname, page FROM instructors WHERE id = (SELECT instr1 FROM courses WHERE name = '$name') OR id = (SELECT instr2 FROM courses WHERE name = '$name')";
    }
    processAndSend($conn, $request);
?>