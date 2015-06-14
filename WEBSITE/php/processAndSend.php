<?php
    function processAndSend($conn, $query) {
        $queryResult = $conn->query($query);
        if(!$queryResult) die($conn->error);
        $result = array();
        while($row = $queryResult->fetch_assoc()) {
            $result[] = array_map('utf8_encode',$row);
        }
        echo json_encode($result);
    }
?>