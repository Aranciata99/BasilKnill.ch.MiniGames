<?php
require './snippets/siteNames.php';
?>

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
        <button id="radnomButton" class="buttonBlackA" onclick="location.href='sites/<?php echo rand(1, $siteAmmount); ?>.php'">Random</button> <br>
    </div>

    <div class="inhaltsverzeichnis">

        <?php

        $page = 1;

        foreach ($siteNames as $name) {
            echo
            "<button class='buttonWhiteB' onclick='location.href=\"sites/$page.php\"'>
            $name
            </button> <br>";
            $page++;
        }
        ?>

    </div>

    <script src="./assets/scripts/js-0.js"></script>

</body>

</html>