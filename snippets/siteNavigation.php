<?php

$sites = glob("./*.php");
$siteAmmount = count($sites);

if ($currentPage == 1) {
    $lastPage = $siteAmmount;
    $nextPage = $currentPage + 1;
} else if ($currentPage == $siteAmmount) {
    $lastPage = $currentPage - 1;
    $nextPage = 1;
} else {
    $lastPage = $currentPage - 1;
    $nextPage = $currentPage + 1;
}

do {
    $random = rand(1, $siteAmmount);
} while ($random == $currentPage);

?>

<div class='fixedNavigation'>
    <button class='buttonWhiteB' onclick="location.href='<?php echo $lastPage ?>.php'">←</button>
    <button class='buttonWhiteB' onclick="location.href='../index.php'">index</button>
    <button class="buttonBlackA" onclick="location.href='<?php echo $random; ?>.php'">Random</button>
    <button class='buttonWhiteB' onclick="location.href='<?php echo $nextPage ?>.php'">→</button>
</div>

<script src="../assets/scripts/js-<?php echo $currentPage ?>.js"></script>