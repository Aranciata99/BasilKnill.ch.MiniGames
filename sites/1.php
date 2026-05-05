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

    <div class="settings">
        <div class="bounceSettings">
            <input type="range" id="Speed" name="Speed" min="0" max="2" value="1" step="0.1" />
            <label for="Speed">↗</label>
            <br>
            <input type="range" id="Count" name="Count" min="1" max="200" value="100" step="1" />
            <label for="Count">+</label>
            <br>
            <input type="range" id="Text" name="Text" min="1" max="6" value="2" step="1" />
            <label for="Text">?</label>
            <br>
        </div>
    </div>



    <?php
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>