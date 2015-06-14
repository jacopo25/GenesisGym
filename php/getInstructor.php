<?php
    header("access-control-allow-origin: *");
    require_once 'login.php';
    require_once 'processAndSend.php';
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error) die($conn->connect_error);
    if(isset($_POST['surname']) && isset($_POST['what'])) {
        $surname = $_POST['surname'];
        $what = $_POST['what'];
    } else {
        echo json_encode("Errore");
        die;
    }
    if($what == "list") {
        $request = "SELECT name, surname, page FROM instructors";
    } else if($what == "generic") {
        $request = "SELECT * FROM instructors WHERE surname = '$surname'";
    } else if($what == "relation") {
        $request = "SELECT name, page FROM courses WHERE instr1 = (SELECT id FROM instructors WHERE surname = '$surname') OR instr2 = (SELECT id FROM instructors WHERE surname = '$surname')";
    } else if($what == "iotm") {
        $request = "SELECT * FROM instructors WHERE iotmCheck = 1";
    }
    processAndSend($conn, $request);
?>