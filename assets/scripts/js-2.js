/*
To Dos

– Responsive machen ohne reload der Seite

*/

const playField = document.getElementById("playField");
//const moveTile = document.getElementById("moveTile");

//Playfield
var gridSizeSides = 5;
var tileAmount = gridSizeSides * gridSizeSides;
let playFieldSize = document.getElementById("playField").getBoundingClientRect().height;
let solutionIsVisible = false;
let solutionTimerLength = 500; //1 Sekunden
let solutionTimer = solutionTimerLength;

//Tile status
let emptyTileNumber = 24; //Position des leeren Tiles []
let tileCoordinates = [];
const imageTiles = [];
let tileIsMoveing = false;
let movingTileNumber;
let numberToChange1;
let numberToChange2;

//Game States
let level = 1;

//Array Setup
let startingArray = [];
let randomizeArray = [];
let winArray = [];

for (let i = 0; i < tileAmount; i++) {
    randomizeArray.push(i);
    winArray.push(i);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//console.log("randomize Array " + randomizeArray);
//console.log("win Array " + winArray);


//move Tile Position
let moveTileXpos = [];
let moveTileYpos = [];
let speed = 5;
let moveDirectionX = 0;
let moveDirectionY = 0;

//empty Tile Position
let emptyTileXpos = 0;
let emptyTileYpos = 0;

//Buttons

const solutionButton = document.getElementById("solutionBtn");
const restartButton = document.getElementById("restartBtn");
const lastLevelButton = document.getElementById("lastLevelBtn");
const nextLevelButton = document.getElementById("nextLevelBtn");
const levelDisplay = document.getElementById("levelDisplay");

//Solution

const solution = document.getElementById("solutionImage");

//Setup Tiles Positions

for (let i = 0; i < tileAmount; i++) {
    const tiles = document.createElement("div");
    tiles.classList.add("zweiTiles");
    tiles.id = "tPos" + i;
    playField.appendChild(tiles);
    tileCoordinates.push({
        x: tiles.getBoundingClientRect().x,
        y: tiles.getBoundingClientRect().y,
        w: tiles.getBoundingClientRect().width,
        h: tiles.getBoundingClientRect().height,
    });
}

setupGame();

function setupGame() {

    shuffleArray(randomizeArray);
    startingArray = [...randomizeArray];

    //Set Speed
    speed = playFieldSize / 100;

    //Setup Tiles

    for (let i = 0; i < tileAmount; i++) {
        //Setup Tiles
        const moveTiles = document.createElement("div");
        moveTiles.classList.add("zweiMoveTiles");
        moveTiles.id = "tNr" + randomizeArray[i];

        document.body.insertBefore(moveTiles, null);
        imageTiles.push(moveTiles);
    }

    //Setup Solution & Level Display

    solution.style.backgroundImage = "url(assets/2-images/bildZwei" + level + ".jpg)";
    levelDisplay.textContent = level;
}


loadTilesAgain();

function loadTilesAgain() {

    for (let i = 0; i < tileAmount; i++) {

        moveTileXpos[i] = tileCoordinates[i].x;
        moveTileYpos[i] = tileCoordinates[i].y;
        imageTiles[i].style.left = moveTileXpos[i] + "px";
        imageTiles[i].style.top = moveTileYpos[i] + "px";
        imageTiles[i].style.visibility = "visible";
        imageTiles[i].style.backgroundImage = "url(assets/2-images/bildZwei" + level + "/bildZwei" + level + "-" + (randomizeArray[i] + 1) + ".jpg)";
    }

    //set not used Tile away
    imageTiles[emptyTileNumber].style.left = 0 + "px";
    imageTiles[emptyTileNumber].style.top = 0 + "px";
    imageTiles[emptyTileNumber].style.visibility = "hidden";

    emptyTileXpos = tileCoordinates[emptyTileNumber].x;
    emptyTileYpos = tileCoordinates[emptyTileNumber].y;

    //console.log("starting Array " + startingArray);
    //console.log("randomize Array " + randomizeArray);

}

//ShowSolutoion

if (window.innerWidth > 700) {

    solutionButton.addEventListener("mouseover", () => {
        solution.style.display = "block";
    });
    solutionButton.addEventListener("mouseleave", () => {
        solution.style.display = "none";
    });

} else {

    solutionButton.addEventListener("touchstart", () => {
        if (solutionIsVisible) {
            solutionIsVisible = false;
            solution.style.display = "none";
        } else {
            solutionIsVisible = true;
            solution.style.display = "block";
        }
        console.log("solutionIsVisible " + solutionIsVisible);
    });

}

//Functions

function intervalFunction() {

    emptyTile.style.left = emptyTileXpos + "px";
    emptyTile.style.top = emptyTileYpos + "px";

    if (tileIsMoveing) {
        moveTileFunction(movingTileNumber);
    }

    //Win State
    if (randomizeArray.toString() === winArray.toString()) {
        //Alert
        alert("You win!");
        //Starting Position of empty Tile right buttom corner
        emptyTileNumber = 24;
        //Next Level
        if (level < 5) {
            level++;
        } else {
            level = 1;
        }
        //Next Level
        shuffleArray(randomizeArray);
        randomizeArray = [...startingArray];
        emptyTileNumber = 24;
        updateLevelDisplay();
        loadTilesAgain();
    }

    if (solutionIsVisible) {
        if (solutionTimer >= 0) {
            solutionTimer--;
        } else {
            solution.style.display = "none";
            solutionIsVisible = false;
            solutionTimer = solutionTimerLength;
        }
    }

    console.log(solutionTimer);
}

//console.log(randomizeArray);
//console.log(startingArray);

//console.log(playFieldSize);

//mouseover Function

if (window.innerWidth > 990) {

    imageTiles.forEach((tile, index) => {
        tile.addEventListener("mouseover", () => {
            if (!tileIsMoveing && isAdjacentToEmpty(index)) {
                movingTileNumber = index;
                tileIsMoveing = true;
                //log in the numbers need to change
                numberToChange1 = randomizeArray[movingTileNumber];
                numberToChange2 = randomizeArray[emptyTileNumber];
                //change the array
                randomizeArray[movingTileNumber] = numberToChange2;
                randomizeArray[emptyTileNumber] = numberToChange1;

                //console.log(randomizeArray);
            }
        });
    });

} else {

    imageTiles.forEach((tile, index) => {
        tile.addEventListener('touchstart', function (event) {
            if (!tileIsMoveing && isAdjacentToEmpty(index)) {
                movingTileNumber = index;
                tileIsMoveing = true;
                //log in the numbers need to change
                numberToChange1 = randomizeArray[movingTileNumber];
                numberToChange2 = randomizeArray[emptyTileNumber];
                //change the array
                randomizeArray[movingTileNumber] = numberToChange2;
                randomizeArray[emptyTileNumber] = numberToChange1;

                //console.log(randomizeArray);
            }
        });
    });

}

function isAdjacentToEmpty(tileIndex) {
    const tilePos = tileCoordinates[tileIndex];
    const emptyPos = tileCoordinates[emptyTileNumber];

    // Prüfe ob das Tile neben dem leeren Tile liegt (horizontal oder vertikal)
    const isSameRow = Math.floor(tileIndex / gridSizeSides) === Math.floor(emptyTileNumber / gridSizeSides);
    const isSameColumn = (tileIndex % gridSizeSides) === (emptyTileNumber % gridSizeSides);

    if (isSameRow && Math.abs(tileIndex - emptyTileNumber) === 1) {
        return true;
    }
    if (isSameColumn && Math.abs(tileIndex - emptyTileNumber) === gridSizeSides) {
        return true;
    }
    return false;
}

function moveTileFunction(nr) {
    // Speichere die aktuelle Position des leeren Tiles
    const targetEmptyX = emptyTileXpos;
    const targetEmptyY = emptyTileYpos;

    // Bestimme die Bewegungsrichtung basierend auf dem aktuellen leeren Tile
    if (moveTileXpos[nr] == targetEmptyX) {
        if (moveTileYpos[nr] < targetEmptyY) {
            moveDirectionY = 1;
        } else {
            moveDirectionY = -1;
        }
        moveDirectionX = 0;
    } else if (moveTileYpos[nr] == targetEmptyY) {
        if (moveTileXpos[nr] < targetEmptyX) {
            moveDirectionX = 1;
        } else {
            moveDirectionX = -1;
        }
        moveDirectionY = 0;
    }

    // Bewege das Tile
    moveTileXpos[nr] += speed * moveDirectionX;
    moveTileYpos[nr] += speed * moveDirectionY;
    imageTiles[nr].style.left = moveTileXpos[nr] + "px";
    imageTiles[nr].style.top = moveTileYpos[nr] + "px";

    // Prüfe ob das Ziel erreicht wurde
    let reachedTarget = false;

    if (moveDirectionX !== 0) {
        if (moveDirectionX === 1 && moveTileXpos[nr] >= targetEmptyX) {
            moveTileXpos[nr] = targetEmptyX;
            reachedTarget = true;
        } else if (moveDirectionX === -1 && moveTileXpos[nr] <= targetEmptyX) {
            moveTileXpos[nr] = targetEmptyX;
            reachedTarget = true;
        }
    }

    if (moveDirectionY !== 0) {
        if (moveDirectionY === 1 && moveTileYpos[nr] >= targetEmptyY) {
            moveTileYpos[nr] = targetEmptyY;
            reachedTarget = true;
        } else if (moveDirectionY === -1 && moveTileYpos[nr] <= targetEmptyY) {
            moveTileYpos[nr] = targetEmptyY;
            reachedTarget = true;
        }
    }

    // Wenn das Ziel erreicht wurde, beende die Bewegung
    if (reachedTarget) {
        tileIsMoveing = false;
        moveDirectionX = 0;
        moveDirectionY = 0;

        // Tausche die Positionen: das bewegte Tile wird zum neuen leeren Tile
        emptyTileXpos = moveTileXpos[nr];
        emptyTileYpos = moveTileYpos[nr];

        // Aktualisiere emptyTileNumber für spätere Klicks
        emptyTileNumber = nr;

        // Lade die leere Tile-Position neu
        loadTilesAgain();
    }
}

//Restart Game

restartButton.addEventListener("click", () => {
    randomizeArray = [...startingArray];
    emptyTileNumber = 24;
    loadTilesAgain();
});

//Change Level

nextLevelButton.addEventListener("click", () => {
    if (level < 5) {
        level++;
    } else {
        level = 1;
    }

    emptyTileNumber = 24;
    updateLevelDisplay();
    loadTilesAgain();
});

lastLevelButton.addEventListener("click", () => {
    if (level > 1) {
        level--;
    } else {
        level = 5;
    }

    emptyTileNumber = 24;
    updateLevelDisplay();
    loadTilesAgain();
});

function updateLevelDisplay() {
    solution.style.backgroundImage = "url(assets/2-images/bildZwei" + level + ".jpg)";
    levelDisplay.textContent = level;
}

//Resize Event

window.addEventListener("resize", () => {

    playFieldSize = document.getElementById("playField").getBoundingClientRect().height;
    //console.log(tileCoordinates[0].x);
    loadTilesAgain();
    location.reload();
    solutionIsVisible = false;

});

//Interval

setInterval(intervalFunction, 1); // jedenFrame (1ms) wird die Funktion ausgeführt