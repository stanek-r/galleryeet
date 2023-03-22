<?php
$servername = "localhost";
$username = "username";
$password = "password";
$database = "database";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    header("Location: https://galleryeet.net/maintenance");
    exit();
}
?>
