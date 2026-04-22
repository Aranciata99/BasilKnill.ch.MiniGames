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
    <title>10’000</title>
</head>

<body>


    <?php
    $menge = 5;
     
    for ($i = 1; $i < $menge + 1; $i++) {
        echo "<div class='wuerfel'>
        <img> 
        </div> <br>";
    };
    ?>

    <p style="color: gray; text-align: center;">Site Under Construction</p>

    <!-- navigation & scripts -->

    <?php
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>