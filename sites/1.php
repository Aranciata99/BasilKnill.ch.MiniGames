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

    <div class="settingsCenter">
        <small>Type in a word and gain points for its uniqueness!</small>
    </div>

    <form action="" class="uniqInputForm">
        <input type="text" class="uniqTextInput"> <br><br>
        <input type="button" class="buttonBlackA" onclick="" value="Confirm">
    </form>

    <?php
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>