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

<body>

    <div class="background" id="background">
    </div>

    <?php
    $menge = 5;

    for ($i = 1; $i < $menge + 1; $i++) {
        echo "<div class='wuerfel'>
        <img> 
        </div> <br>";
    };
    ?>

    <div class="settings">
        <small style="color: black; line-height: 0; text-align: center;">Player:</small>
        <div class="playerNamesContainer" id="playerNamesContainer">
        </div>
        <button class="buttonWhiteB" id="addPlayerButton" style="margin-top: 20px;">+</button>
        <button class="buttonWhiteB" id="deletePlayerButton" style="margin-top: 20px;">–</button> <br>
        <p style="color: black; font-size: 0.7rem; line-height: 1.2;">Type in «+» for <br> Computer Opponent.</p>
    </div>

    <div class="settingsCenter">
        <p style="color: black; font-size: 2rem; line-height: 1; text-align: center;">+ <span id="currentCounter"></span></p>
        <!-- <small><span id="displayWhoIsPlaying">Basil</span></small> -->
    </div>

    <button class='buttonWhiteB' id="takePointsButton" style="position: absolute; top: 20px; left: 50%; transform: translate(-50%, 0); z-index: 999;">TAKE POINTS</button>
    <small id="notOutYetText" style="color: black; position: absolute; top: 20px; left: 50%; transform: translate(-50%, 0); z-index: 999;">Get 1000 first</small>

    <!-- Rules -->

    <?php
    require '../snippets/siteRules.php';
    ?>

    <!-- navigation & scripts -->

    <?php
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>