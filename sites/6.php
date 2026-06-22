<?php
$currentPage = basename(__FILE__, '.php');
require '../snippets/siteNames.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php
    require '../snippets/head.php';
    ?>
    <title><?php echo $siteNames[$currentPage - 1] ?></title>
</head>

<body id="background">
    <?php

    // upper

    $upperElements = [2, 3, 2];
    $upperColor = ["red", "blue", "green"];

    // under

    $underElements = [2, 3, 2, 0, 5];

    ?>

    <div class="newPearlsPathContainer" id="newPearlsPath">
        <div class="fillStackBox" id="pearlsPathBox">
            <div class="fillStackStick" style="border-right: dotted black var(--buttonBorderSize);"></div>
        </div>
        <!-- <button class="newPearlButton" id="newPearlButton">+</button> -->
        <div id="targetRemovePointsUI" style="background-color: none; position: absolute; top: 250px; right: 75px; height: 10px;width: 10px;"></div>
    </div>

    <div class="uiSortingContainer">
        <small> p</small>
        <p id="counter"></p>
    </div>

    <div class="settingsCenterBottom" id="sortingRestartButton">
        <button class="buttonWhiteB" id="restartGameButton">RESTART</button>
    </div>

    <div class="settingsLeftBottom" id="sortingColorValue">
        <small> <span style="color: red;">●</span> 5</small>
        <small> <span style="color: blue;">●</span> 10</small>
        <small> <span style="color: green;">●</span> 20</small>
        <small> <span style="color: violet;">●</span> 50</small>
        <small> <span style="color: orange;">●</span> 100</small>
    </div>

    <div class="settingsCenterSorting">
        <small style="color: black;">×<span id="topStackMultiplier"></span></small>
    </div>
    
    <div id="playField">
        <div class="upperPlayfield" id="upperPlayfield">


        </div>

        <div class="underPlayfield" id="underPlayfield">

        </div>
    </div>

    <!-- navigation & scripts -->

    <?php
    require '../snippets/siteNavigation.php';
    ?>
</body>

</html>