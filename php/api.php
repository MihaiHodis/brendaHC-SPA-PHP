<?php
// Include conexiunea la baza de date
include 'db.php';

// Query pentru a selecta toate prajiturile
$sql = "SELECT id, nume, descriere, imagine FROM prajituri";
$result = $conn->query($sql);

// Crearea unui array pentru a stoca rezultatele
$prajituri = [];

if ($result->num_rows > 0) {
    // Itereaza prin fiecare rand si il adauga in array
    while ($row = $result->fetch_assoc()) {
        $prajituri[] = $row;
    }
}

// Convertim array-ul în format JSON
header('Content-Type: application/json');
echo json_encode($prajituri);
?>