/*
To Dos

– Shauen ob Gegner fast 3 hat

– Responsive Layout
– Responsive Inputs

*/

//Playfield
const playField = document.getElementById("playField");

const baseTiles = [];
const baseTilesStatus = []; //0 empty – 1 filled X – 2 filled o;
const crossTiles = [];
const circleTiles = [];

//Colors
const grayColor = "#e6e6e6";

//whos Turn?
let whoIsPlaying = 1; //0 = Circle – 1 = Cross

//how much turnes where made?
let turns = 0;

//UI
const displayTurn = document.querySelector(".settingsRight");
const computerButton = document.getElementById("computerButton");
//Counter
const playerOneCountDisplay = document.getElementById("playerOneCount");
const playerTwoCountDisplay = document.getElementById("playerTwoCount");
let playerOneCount;
let playerTwoCount;

const playerOneName = document.getElementById("playerOneName");
const playerTwoName = document.getElementById("playerTwoName");
let playerOneNameContentPVP = "PLAYER 1";
let playerTwoNameContentPVP = "PLAYER 2";
let playerOneNameContentPVE = "PLAYER";
let playerTwoNameContentPVE = "COMPUTER";

playerOneName.textContent = playerOneNameContentPVP;
playerTwoName.textContent = playerTwoNameContentPVP;

playerOneCount = 0;  //Cross
playerTwoCount = 0; //Circle

//Computer
let isComputerOn = false;
let computersTurn = false;

loadNewGame(1);

//Setup Game
function loadNewGame(playerTurn) {

    //whos Turn?
    whoIsPlaying = playerTurn; //0 = Circle – 1 = Cross

    //how much turnes where made?
    turns = 0;

    for (let i = 0; i < 9; i++) {

        //Create Base Tile
        const tiles = document.createElement("div");
        tiles.classList.add("tictactoeTiles");
        playField.appendChild(tiles);
        baseTiles.push(tiles);
        //Create Cross Tiles
        const crosses = document.createElement("div");
        crosses.classList.add("tictactoeCrosses");
        tiles.appendChild(crosses);
        crossTiles.push(crosses);
        for (let i = 0; i < 2; i++) {
            const crossDiv = document.createElement("div");
            if (i == 0) {
                crossDiv.style.transform = "rotate(45deg) translate(5vmin, 8.5vmin)";
            } else {
                crossDiv.style.transform = "rotate(-45deg) translate(-8.5vmin, 5vmin)";
            }
            crosses.appendChild(crossDiv);
        }
        //Create Circle Tiles
        const circles = document.createElement("div");
        circles.classList.add("tictactoeCircles");
        tiles.appendChild(circles);
        circleTiles.push(circles);

        //Status of Tiles
        baseTilesStatus.push(0);

    };

    //not display Tiles
    for (let i = 0; i < 9; i++) {
        crossTiles[i].style.display = "none";
        circleTiles[i].style.display = "none";
        circleTiles[i].style.border = "4px solid #e6e6e6";
        for (let c = 0; c < 2; c++) {
            crossTiles[i].children[c].style.border = "2px solid #e6e6e6";
        }

        //set Status to 0
        baseTilesStatus[i] = 0;
    }

    //UI Setup
    if (whoIsPlaying == 1) {
        displayTurn.textContent = "×";
        playerOneName.style.textDecoration = "underline";
        playerTwoName.style.textDecoration = "none";
    } else if (whoIsPlaying == 0) {
        displayTurn.textContent = "o";
        playerOneName.style.textDecoration = "none";
        playerTwoName.style.textDecoration = "underline";
    }

    //Player Count
    playerOneCountDisplay.textContent = playerOneCount; //Cross
    playerTwoCountDisplay.textContent = playerTwoCount; //Circle
}

function setComputerStatus() {
    if (isComputerOn) {
        //set Button
        computerButton.classList.remove("buttonBlackA");
        computerButton.classList.add("buttonWhiteB");
        computerButton.textContent = "ON";
        //Display Player Names
        playerOneName.textContent = playerOneNameContentPVP;
        playerTwoName.textContent = playerTwoNameContentPVP;
        isComputerOn = false;

        console.log("Computer On");
    } else {
        //set Button
        computerButton.classList.remove("buttonWhiteB");
        computerButton.classList.add("buttonBlackA");
        computerButton.textContent = "OFF";
        //Display Player Names
        playerOneName.textContent = playerOneNameContentPVE;
        playerTwoName.textContent = playerTwoNameContentPVE;
        isComputerOn = true;
        if (whoIsPlaying == 0) {
            computersTurn = true;
            computerInput();
        }
    }
}

//Check if someone wins

function checkIfSomeoneWins() {

    if (turns < 9) {
        console.log("who wins?");
        if (
            //Verical
            baseTilesStatus[0] == 1 && baseTilesStatus[1] == 1 && baseTilesStatus[2] == 1 ||
            baseTilesStatus[3] == 1 && baseTilesStatus[4] == 1 && baseTilesStatus[5] == 1 ||
            baseTilesStatus[6] == 1 && baseTilesStatus[7] == 1 && baseTilesStatus[8] == 1 ||
            //Horizontal
            baseTilesStatus[0] == 1 && baseTilesStatus[3] == 1 && baseTilesStatus[6] == 1 ||
            baseTilesStatus[1] == 1 && baseTilesStatus[4] == 1 && baseTilesStatus[7] == 1 ||
            baseTilesStatus[2] == 1 && baseTilesStatus[5] == 1 && baseTilesStatus[8] == 1 ||
            //Cross
            baseTilesStatus[0] == 1 && baseTilesStatus[4] == 1 && baseTilesStatus[8] == 1 ||
            baseTilesStatus[2] == 1 && baseTilesStatus[4] == 1 && baseTilesStatus[6] == 1
        ) {
            console.log("PLAYER 1 – × – WINS!");
            alert("PLAYER 1 – × – WINS!");
            playerOneCount++; //Cross
            loadNewGame(0);
        } else if (
            //Verical
            baseTilesStatus[0] == 2 && baseTilesStatus[1] == 2 && baseTilesStatus[2] == 2 ||
            baseTilesStatus[3] == 2 && baseTilesStatus[4] == 2 && baseTilesStatus[5] == 2 ||
            baseTilesStatus[6] == 2 && baseTilesStatus[7] == 2 && baseTilesStatus[8] == 2 ||
            //Horizontal
            baseTilesStatus[0] == 2 && baseTilesStatus[3] == 2 && baseTilesStatus[6] == 2 ||
            baseTilesStatus[1] == 2 && baseTilesStatus[4] == 2 && baseTilesStatus[7] == 2 ||
            baseTilesStatus[2] == 2 && baseTilesStatus[5] == 2 && baseTilesStatus[8] == 2 ||
            //Cross
            baseTilesStatus[0] == 2 && baseTilesStatus[4] == 2 && baseTilesStatus[8] == 2 ||
            baseTilesStatus[2] == 2 && baseTilesStatus[4] == 2 && baseTilesStatus[6] == 2
        ) {
            console.log("PLAYER 2 – o – WINS!");
            alert("PLAYER 2 – o – WINS!");
            playerTwoCount++; //Circle
            loadNewGame(1);
        }
    }
    else {
        console.log("NO ONE WINS!");
        alert("NO ONE WINS!");
        if (whoIsPlaying == 1) {
            loadNewGame(0);
        } else {
            loadNewGame(1);
        }
    }
}

//inputs

//desktop

baseTiles.forEach((tile, index) => {

    //Hover

    //console.log(whoIsPlaying + " is Playing");


    tile.addEventListener("mouseover", () => {
        if (baseTilesStatus[index] == 0) {
            if (whoIsPlaying == 1) {
                crossTiles[index].style.display = "block";
            } else if (whoIsPlaying == 0 && !computersTurn) {
                circleTiles[index].style.display = "block";
            }
        }
    });
    tile.addEventListener("mouseleave", () => {
        if (baseTilesStatus[index] == 0) {
            if (whoIsPlaying == 1) {
                crossTiles[index].style.display = "none";
            } else if (whoIsPlaying == 0 && !computersTurn) {
                circleTiles[index].style.display = "none";
            }
        }
    });

    //Input

    tile.addEventListener("click", () => {

        if (baseTilesStatus[index] == 0 && !computersTurn) {

            if (whoIsPlaying == 0 && !computersTurn) {
                baseTilesStatus[index] = 2;
            } else if (whoIsPlaying == 1 && !computersTurn) {
                baseTilesStatus[index] = 1;
            }

            turns++;

            //set black
            for (let i = 0; i < 2; i++) {
                crossTiles[index].children[i].style.border = "2px solid black";
            }
            circleTiles[index].style.border = "4px solid black";

            if (whoIsPlaying == 0 && !computersTurn) {
                whoIsPlaying = 1;
                displayTurn.textContent = "×";
                playerOneName.style.textDecoration = "underline";
                playerTwoName.style.textDecoration = "none";
            } else if (whoIsPlaying == 1 && !computersTurn) {
                whoIsPlaying = 0;
                displayTurn.textContent = "o";
                playerOneName.style.textDecoration = "none";
                playerTwoName.style.textDecoration = "underline";
            }

            //Check if someone wins and output 
            if (!computersTurn) {
                checkIfSomeoneWins();
            }
        }

        if (whoIsPlaying == 0 && !computersTurn && isComputerOn) {
            computerInput();
        }

    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function findBestMove(player) {
    for (let [a, b, c] of winningCombos) {
        if (baseTilesStatus[a] == player && baseTilesStatus[b] == player && baseTilesStatus[c] == 0) return c;
        if (baseTilesStatus[a] == player && baseTilesStatus[c] == player && baseTilesStatus[b] == 0) return b;
        if (baseTilesStatus[b] == player && baseTilesStatus[c] == player && baseTilesStatus[a] == 0) return a;
    }
    return -1; // kein Zug gefunden
}


function computerInput() {

    computersTurn = true;

    //Kann Computer gewinnen?
    let move = findBestMove(2);

    //Spieler blockieren?
    if (move == -1) {
        move = findBestMove(1);
    }

    //Zufällig
    if (move == -1) {
        do {
            move = getRandomInt(9);
        } while (baseTilesStatus[move] != 0);
    }

    radnomPos = move;

    setTimeout(() => {
        console.log(radnomPos);
        randomPreview = false;
        displayTurn.textContent = "×";
        baseTilesStatus[radnomPos] = 2;
        circleTiles[radnomPos].style.display = "block";
        circleTiles[radnomPos].style.border = "4px solid black";
        whoIsPlaying = 1;
        turns++;
        computersTurn = false;
    }, 600);

    for (let i = 0; i < 3; i++) {

        let radnomPreviewPos;

        do {
            radnomPreviewPos = getRandomInt(9);
        } while (
            baseTilesStatus[radnomPreviewPos] != 0
        );
        setTimeout(() => {
            circleTiles[radnomPreviewPos].style.display = "block";
        }, 160 * i);
        setTimeout(() => {
            circleTiles[radnomPreviewPos].style.display = "none";
        }, 160 * (i + 1));
    }
    setTimeout(() => {
        checkIfSomeoneWins();
    }, 1000);
};

//UI

computerButton.addEventListener("click", () => {
    setComputerStatus();
});

//Random Numbers

//Resize Event

window.addEventListener("resize", () => {

});

//Interval

// function intervalFunction(){

// }

// setInterval(intervalFunction, 1); // jedenFrame (1ms) wird die Funktion ausgeführt

