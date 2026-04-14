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
</head>

<body>

    <div class="settings">
        <small style="color: black; margin-right: 10px;">Computer:</small> <button class="buttonWhiteB" id="computerButton">ON</button>
    </div>

    <div class="settingsRight">
        O
    </div>

    <div class="tttDisplayCount">

        <div class="tttDisplayPlayerOne">
            <small id="playerOneName"></small>
            <p id="playerOneCount"></p>
            <small>×</small>
        </div>
        <div class="tttDisplayPlayerTwo">
            <small id="playerTwoName"></small>
            <p id="playerTwoCount"></p>
            <small>o</small>
        </div>

    </div>

    <div class="tictactoeplayfield" id="playField">
        <div style="height: 99%; left: 33.3333%" class="tictactoeGridLine"></div>
        <div style="height: 99%; left: 66.6666%" class="tictactoeGridLine"></div>
        <div style="width: 99%; top: 33.3333%" class="tictactoeGridLine"></div>
        <div style="width: 99%; top: 66.6666%" class="tictactoeGridLine"></div>
    </div>



    <!-- navigation & scripts -->

    <?php
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>