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
    require '../snippets/siteNavigation.php';
    ?>

</body>

</html>