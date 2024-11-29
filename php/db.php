<?php
// Datele pentru conexiunea la baza de date
$host = "localhost";
$user = "brendaUser";
$password = "1234";
$dbname = "brendadb";

// Crearea conexiunii
$conn = new mysqli($host, $user, $password, $dbname);

// Verificarea conexiunii
if ($conn->connect_error) {
    die("Conexiunea a eșuat: " . $conn->connect_error);
}
?>
