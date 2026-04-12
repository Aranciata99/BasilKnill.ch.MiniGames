<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="index.css">
    <title>ZWEI</title>
</head>

<body>  

    <div class="settings" style="position: absolute; left: 20px; top: 20px; line-height: 2;">
        <button id="lastLevelBtn">←</button>
        <label for="Speed" style="top: 2px;">
            <span style="padding-inline: 10px;" id="levelDisplay">
            </span>
        </label>
        <button id="nextLevelBtn">→</button> <br>
        <button id="solutionBtn">SHOW SOLUTION</button>
        <br>
        <button id="restartBtn">RESTART</button>
    </div>

    <div class="emptyTile" id="emptyTile">
    </div>


    <div class="playfield" id="playField">
    </div>
    <div class="solution" id="solutionImage">
    </div>

    <div class='navigation'>
        <button class='nextGameButton' onclick="location.href='index.php'">←</button>
        <button class='nextGameButton' onclick="location.href='3.php'">→</button>
    </div>

    <script src="assets/scripts/js-2.js"></script>

</body>

</html>