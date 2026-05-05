<div class="settingsLeftBottom" id="openRulesButton">
    <button class='buttonWhiteB' style="z-index: 999;">RULES</button>
</div>

<div class="rulesContainer" id="rulesContainer">
    <h1><?php echo $siteNames[$currentPage - 1] ?></h1>
    <?php
    require '../sites/' . $currentPage . 'Rules.php';
    ?>
</div>

<script src="../assets/scripts/js-rules.js"></script>
