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

    <?php

    // upper

    $upperElements = [2, 3, 2];
    $upperColor = ["red", "blue", "green"];

    // under

    $underElements = [2, 3, 2, 0, 5];

    ?>

    <div class="upperPlayfield" id="upperPlayfield">
        
    </div>

    <div class="underPlayfield" id="underPlayfield">
       
    </div>

    <!-- navigation & scripts -->

    <?php
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>