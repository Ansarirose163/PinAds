<?php
$id = $_GET['id'] ?? '';
if ($id) {
    $file = "verified_ids.txt";
    if (!file_exists($file)) {
        file_put_contents($file, "");
    }

    $existing = file($file, FILE_IGNORE_NEW_LINES);
    if (!in_array($id, $existing)) {
        file_put_contents($file, $id . "\n", FILE_APPEND);
    }
}
?>
<html>
<head><meta charset="UTF-8"><title>Verified</title></head>
<body style="text-align:center; padding-top:50px; font-family:sans-serif;">
    <h2>✅ ID Verified</h2>
    <p>अब आप App में वापस जाएं।</p>
</body>
</html>
