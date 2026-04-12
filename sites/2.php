<!DOCTYPE html>
<html lang="en">

<head>
    <?php
    require '../snippets/head.php';
    ?>
    <title>Puzzle</title>
</head>

<body>

    <div class="settings">
        <button class="buttonWhiteB" id="lastLevelBtn">←</button>
        <label for="Speed" style="top: 2px;">
            <span style="padding-right: 6px;" id="levelDisplay">
            </span>
        </label>
        <button class="buttonWhiteB" id="nextLevelBtn">→</button> <br>
        <button class="buttonWhiteB" id="solutionBtn">SHOW SOLUTION</button>
        <br>
        <button class="buttonBlackA" id="restartBtn">RESTART</button>
    </div>

    <div class="emptyTile" id="emptyTile">
    </div>


    <div class="playfield" id="playField">
    </div>
    <div class="solution" id="solutionImage">
    </div>

    <!-- navigation & scripts -->

    <?php
    $currentPage = basename(__FILE__, '.php');
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>