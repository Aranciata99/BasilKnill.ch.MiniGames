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
            <div class="fillStackBox" style="top: 125px;" id="pearlsPathBox">
                <div class="fillStackStick" style="border-right: dotted black var(--buttonBorderSize);">

                </div>

            </div>

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