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

    <div class="snakePointsCounter" id="snakePointsCounter">
    </div>

    <div class="snakeHead" id="head">

    </div>


    <!-- navigation & scripts -->

    <?php
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>