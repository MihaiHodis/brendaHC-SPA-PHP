<?php
    include 'db.php';

    // Interogare pentru a prelua toate pachetele
    $sql = "SELECT * FROM pachete";
    $result = $conn->query($sql);

    $pachete = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $pachete[] = $row;
        }
    }

    // Returneaza rezultatele in format JSON
    header('Content-Type: application/json');
    echo json_encode($pachete);

    $conn->close();
?>