<?php
$id = $_GET['id'] ?? '';
$found = false;

if ($id && file_exists("../verified_ids.txt")) {
    $lines = file("../verified_ids.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (in_array($id, $lines)) {
        $found = true;
    }
}

header("Content-Type: application/json");
echo json_encode(["verified" => $found]);
?>
