<!DOCTYPE html>
<html lang="en">

<head>
    <?php
    require '../snippets/head.php';
    ?>
    <title>Snake</title>
</head>

<body>

    <div class="snakePointsCounter" id="snakePointsCounter">
    </div>

    <div class="snakeHead" id="head">

    </div>


    <!-- navigation & scripts -->

    <?php
    $currentPage = basename(__FILE__, '.php');
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>