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
        $request = "SELECT name, page FROM categories";
    } else if($what == "generic") {
        $request = "SELECT * FROM categories WHERE name = '$name'";   
    } else if($what == "relation") {
 		$request = "SELECT name, page FROM courses WHERE category = '$name'";
    }
    processAndSend($conn, $request);
?>