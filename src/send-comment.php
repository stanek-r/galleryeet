<?php
include 'connect.php';
$returnpost = $conn->real_escape_string($_POST['returnpost']);

if (isset($_POST['name']) && isset($_POST['text'])) {
  $name = $conn->real_escape_string($_POST['name']);
  $text = $conn->real_escape_string($_POST['text']);

  if (strlen($name) >= 5 && strlen($text) >= 10) {
    $sql =
      "INSERT INTO comments (name, autor, ip, text, created) VALUES ('" .
      $returnpost .
      "', '" .
      $name .
      "', 'null', '" .
      $text .
      "', now())";
    $conn->query($sql);
  }
}
header('Location: /posts/' . $returnpost);
exit();
?>
