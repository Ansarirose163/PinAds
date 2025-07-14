<?php
$id = $_GET['id'] ?? '';
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>🎉 Welcome</title>
    <style>
        body {
            background-color: #0f0f0f;
            color: #00ff99;
            font-family: 'Segoe UI', sans-serif;
            text-align: center;
            padding-top: 100px;
        }
        h1 {
            font-size: 40px;
            color: #00e676;
        }
        p {
            font-size: 20px;
            color: #bbbbbb;
        }
        .checkmark {
            font-size: 80px;
            color: #00e676;
        }
    </style>
</head>
<body>
    <div class="checkmark">✔️</div>
    <h1>Welcome Verified User</h1>
    <p>Your ID <b><?php echo htmlspecialchars($id); ?></b> has been successfully verified.</p>
</body>
</html>
