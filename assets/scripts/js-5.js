/*

– 3er gewürfelt
    – fail Points Counter Poition on the right side –> dreier gewürfelt muss deaktiviert sein und einfluss haben
    – Wenn drilling bereits gewürfelt = noch aktiv / Booster

– 2 5er ein 1er
– Würfel nicht übereinander
– check if all Player Names Put in
– Z-Index, was ist zuoberst?
– was passiert wenn player entfernt?
– was passiert wenn player entfernt und who is playing += playerCount
– Animation Points / Win Lose etc.
– Computer

*/

//Random Numbers

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

//Würfel

let diceNumber = [0, 0, 0, 0, 0];
let diceStatus = [false, false, false, false, false];
let diceThrowPos = [[], [], []]; //x, y, r
let collectedPos = 0;
let collectedPosOnTrow;

//tripple
let trippleThrown = false;
let trippleNumber;


//count

const currentCounter = document.getElementById("currentCounter");
//const counter = document.getElementById("addcounter");
let count = 0;
//let absCounter = 0;
updateCounter(0);

//UI

const background = document.getElementById("background");
const takePointsButton = document.getElementById("takePointsButton");
takePointsButton.style.display = "none";

//players
const playersContainer = document.getElementById("playerNamesContainer");
const addPlayerButton = document.getElementById("addPlayerButton");
const deletePlayerButton = document.getElementById("deletePlayerButton");

let playerUIslots = [];
let playersTurn = 0;
let playerCounts = [];

//Game Loop
let isPointsCollected = 0;
let firstThrow = true;


//Setup
const wuerfel = document.querySelectorAll(".wuerfel");
const wuerfelImage = document.querySelectorAll(".wuerfel img");
let wuerfelAugenFarbe = "weiss" //"schwarz"

wuerfel.forEach((w, index) => {
    w.style.backgroundColor = "black";
    w.style.top = (window.innerHeight / 3) + (40 * index) + "px";
    w.style.left = window.innerWidth / 2 + "px";
    w.style.transform = `rotate(0deg)`;
    wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 1 + ".png";
});

function setDiceInCenter() {

    takePointsButton.style.display = "none";

    collectedPos = 0;
    diceStatus = [false, false, false, false, false];
    wuerfel.forEach((w, index) => {
        w.style.backgroundColor = "black";
        w.style.top = (window.innerHeight / 3) + (40 * index) + "px";
        w.style.left = window.innerWidth / 2 + "px";
        w.style.transform = `rotate(0deg)`;
        wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 1 + ".png";
    });

    count = 0;
    updateCounter(0);

    if (playersTurn < playerUIslots.length - 1) {
        playersTurn++;
    } else {
        playersTurn = 0;
    }

    showWhoIsPlaying();
}

//throwDice

function throwDice() {

    takePointsButton.style.display = "none";

    if (collectedPos == 5) {
        collectedPos = 0;
        diceStatus = [false, false, false, false, false];
    }
    wuerfel.forEach((w, index) => {
        if (diceStatus[index] == false) {
            let diceCount = randomInt(1, 7);
            let dicePosX = randomFloat(0, window.innerWidth - 50);
            let dicePosY = randomFloat(0, window.innerHeight - 250);
            let diceRot = randomFloat(0, 360);
            w.style.left = dicePosX + "px";
            w.style.top = dicePosY + "px";
            w.style.transform = `rotate(${diceRot}deg)`;
            wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + diceCount + ".png";
            diceNumber[index] = diceCount;
            //push Pos
            diceThrowPos[0].push(dicePosX);
            diceThrowPos[1].push(dicePosY);
            diceThrowPos[2].push(diceRot);
        }
    });

    //Check if three thrown
    areThreeSameThrown();

    collectedPosOnTrow = collectedPos;
    firstThrow = false;
}

//select Dice

wuerfel.forEach((w, index) => {
    w.addEventListener("click", () => {
        if (trippleThrown) {
            if (diceNumber[index] == trippleNumber) {
                let trippleCounter = 0;
                wuerfel.forEach((triple, i) => {
                    if (diceNumber[i] == trippleNumber) {
                        if (trippleCounter < 2) {
                            selectDice(triple, i, 0, true);
                            diceStatus[i] = true;
                        } else {
                            selectDice(triple, i, trippleNumber * 100, true);
                            diceStatus[i] = true;
                        }
                        trippleCounter++;
                    }
                });

            } else {
                if (diceNumber[index] == 1 && diceStatus[index] == false && diceNumber[index] != trippleNumber) {
                    selectDice(w, index, 100, true);
                    diceStatus[index] = true;
                } else if (diceNumber[index] == 1 && diceStatus[index] == true) {
                    selectDice(w, index, -100, false);
                    diceStatus[index] = false;
                }

                if (diceNumber[index] == 5 && diceStatus[index] == false) {
                    selectDice(w, index, 50, true);
                    diceStatus[index] = true;
                } else if (diceNumber[index] == 5 && diceStatus[index] == true) {
                    selectDice(w, index, -50, false);
                    diceStatus[index] = false;
                }
            }
        } else {
            if (diceNumber[index] == 1 && diceStatus[index] == false && diceNumber[index] != trippleNumber) {
                selectDice(w, index, 100, true);
                diceStatus[index] = true;
            } else if (diceNumber[index] == 1 && diceStatus[index] == true) {
                selectDice(w, index, -100, false);
                diceStatus[index] = false;
            }

            if (diceNumber[index] == 5 && diceStatus[index] == false) {
                selectDice(w, index, 50, true);
                diceStatus[index] = true;
            } else if (diceNumber[index] == 5 && diceStatus[index] == true) {
                selectDice(w, index, -50, false);
                diceStatus[index] = false;
            }
        }
    });
});

//check if there are 3 or more

function areThreeSameThrown() {
    const c = [];
    diceNumber.forEach((nr, i) => {
        c[nr] = (c[nr] || 0) + 1;
    });
    c.forEach((nr, i) => {
        if (nr == 3) {
            trippleThrown = true;
            trippleNumber = i;
            console.log("THREEE!");

        }
    });
}

//hover on Dice

wuerfel.forEach((w, index) => {
    w.addEventListener("mouseover", () => {
        if (diceNumber[index] == 1 && trippleNumber != 1) {
            w.style.backgroundColor = "blue";
        } else if (diceNumber[index] == 5 && trippleNumber != 5) {
            w.style.backgroundColor = "green";
        } else if (trippleThrown && diceNumber[index] == trippleNumber) {
            wuerfel.forEach((trip, i) => {
                if (diceNumber[i] == trippleNumber) {
                    trip.style.backgroundColor = "red"
                }
            });
        } else {
            w.style.backgroundColor = "gray";
        };
    });

    w.addEventListener("mouseleave", () => {
        wuerfel.forEach(all => {
            all.style.backgroundColor = "black"
        });
    });
});

//Input

//Select a Dice

function selectDice(w, i, c, isPicket) {
    if (isPicket) {
        w.style.left = window.innerWidth - 50 + "px";
        w.style.top = 20 + (collectedPos * 40) + "px";
        w.style.transform = `rotate(0)`;
        collectedPos++;
        isPointsCollected++;
    } else {
        w.style.left = diceThrowPos[0][i] + "px";
        w.style.top = diceThrowPos[1][i] + "px";
        w.style.transform = `rotate(${diceThrowPos[2][i]}deg)`;
        collectedPos--;
        isPointsCollected--;
    }

    if (isPointsCollected != 0) {
        takePointsButton.style.display = "block";
    } else {
        takePointsButton.style.display = "none";
    }

    console.log(isPointsCollected + " are points collected?");
    

    //counter
    updateCounter(c);
}

//Throw Dice Input

background.addEventListener("click", () => {
    if (firstThrow) {
        throwDice();
    } else {
        if (isPointsCollected == 0) {
            setDiceInCenter();
            firstThrow = true;
        } else {
            throwDice();
        }
    }
    isPointsCollected = 0;
});

//Take Points Input

takePointsButton.addEventListener("click", () => {
    playerCounts[playersTurn] += count;
    const playerScore = document.getElementById("playerCount" + playersTurn);
    playerScore.textContent = playerCounts[playersTurn];

    if (playersTurn < playerUIslots.length - 1) {
        playersTurn++;
    } else {
        playersTurn = 0;
    }

    showWhoIsPlaying();
    firstThrow = true;

    takePointsButton.style.display = "none";
});

//Counter

function updateCounter(add) {
    count += add;
    //currentCounter.textContent = absCounter;
    currentCounter.textContent = count;
}

//UI

addPlayerButton.addEventListener("click", () => {
    addPlayer();
});

deletePlayerButton.addEventListener("click", () => {
    deleteLastPlayer();
});

//Add two players on Start

addPlayer();
addPlayer();

function addPlayer() {
    if (playerUIslots.length < 10) {

        let pC = playerUIslots.length;

        const playerForm = document.createElement("label");
        playerForm.id = "player" + pC;
        playerForm.for = "Player" + pC;
        playersContainer.appendChild(playerForm);

        const playerFormInput = document.createElement("input");
        playerFormInput.type = "text";
        playerFormInput.id = "player" + pC;
        playerFormInput.name = "player" + pC;
        playerFormInput.placeholder = "Player Name";
        playerFormInput.required;
        playerFormInput.minlength = "4";
        playerFormInput.maxlength = "100";
        playerFormInput.size = "8";
        playerForm.appendChild(playerFormInput);

        const playerScore = document.createElement("span");
        playerScore.id = "playerCount" + pC;
        playerScore.textContent = "0";
        playerForm.appendChild(playerScore);

        playerUIslots.push(playerForm);
        playerCounts.push(0);
    }
}

function deleteLastPlayer() {
    if (playerUIslots.length > 2) {
        playerUIslots[playerUIslots.length - 1].remove();
        playerUIslots.pop();
    }
}

showWhoIsPlaying();

function showWhoIsPlaying() {
    playerUIslots.forEach(slots => {
        slots.style.color = "black";
        slots.firstElementChild.style.color = "black";
    });
    playerUIslots[playersTurn].style.color = "red";
    playerUIslots[playersTurn].firstElementChild.style.color = "red";

}


//Playfield


//Resize Event

window.addEventListener("resize", () => {

});

//Interval

function intervalFunction() {
    console.log(trippleNumber);
};

setInterval(intervalFunction, 1000); // jedenFrame (1ms) wird die Funktion ausgeführt

