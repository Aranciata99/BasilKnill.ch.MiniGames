<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="index.css">
    <title>EINS</title>
</head>

<body>

    <div class="settings" style="position: absolute; left: 20px; top: 20px;">
        <input type="range" id="Speed" name="Speed" min="0" max="2" value="1" step="0.1"/>
        <label for="Speed">↗</label>
        <br>
        <input type="range" id="Count" name="Count" min="1" max="200" value="100" step="1"/>
        <label for="Count">+</label>
        <br>
        <input type="range" id="Text" name="Text" min="1" max="6" value="2" step="1"/>
        <label for="Text">?</label>
        <br>
    </div>

    <div class='navigation'>
        <button class='nextGameButton' onclick="location.href='3.php'">←</button>
        <button class='nextGameButton' onclick="location.href='2.php'">→</button>
    </div>

    <script src="assets/scripts/js-1.js"></script>

</body>

</html>