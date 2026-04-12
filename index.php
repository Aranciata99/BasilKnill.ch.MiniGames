<!DOCTYPE html>
<html lang="en">

<head>
    <?php
    require './snippets/head.php';
    ?>
    <title>BASIL KNILL | Mini Games</title>
</head>

<body>

    <?php
    $sites = glob("./sites/*.php");
    $siteAmmount = count($sites);
    ?>

    <div class="inhaltsverzeichnisRandom">
        <button class="buttonBlackA" onclick="location.href='sites/<?php echo rand(1, $siteAmmount); ?>.php'">Random</button> <br>
    </div>


    <div class="inhaltsverzeichnis">

        <?php

        $siteNames = ["Bounce", "Puzzle", "Snake"]; // add site by add string here
        $page = 1;

        foreach ($siteNames as $name) {
            echo
            "<button class='buttonWhiteB' onclick='location.href=\"sites/$page.php\"'>
            $page – $name
            </button> <br>";
            $page++;
        }
        ?>

    </div>

</body>

</html>