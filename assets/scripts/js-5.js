/*

UI
– check if all Player Names Put in
– was passiert wenn player entfernt?
– was passiert wenn player entfernt und who is playing += playerCount

+
– Computer
– ruleset
– Win state of a Person

– Testen – 

Bugs
– tripple Teils stehen geblieben
– Take Points gets weirldly stuck Things sometimes
– Kollisionen manchmal komisch – Logik nochmal überdenken

Adds
– Coice if throw all again on restart

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
let diceInCenter = true;

//tripple
let trippleThrown = false;
let trippleNumber;
let trippleChance = false;
let anoterTrippleIsCollected = 3;

//double five
let doubleFive = false;
let fivesPos = [];
let fiveChoice = false;

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
    wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 0 + ".png";
});

function setDiceInCenter() {

    takePointsButton.style.display = "none";
    diceInCenter = true;

    collectedPos = 0;
    diceStatus = [false, false, false, false, false];
    wuerfel.forEach((w, index) => {
        w.style.backgroundColor = "black";
        w.style.top = (window.innerHeight / 3) + (40 * index) + "px";
        w.style.left = window.innerWidth / 2 + "px";
        w.style.transform = `rotate(0deg)`;
        wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 0 + ".png";
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
    trippleThrown = false;
    diceInCenter = false;

    if (collectedPos == 5) {
        collectedPos = 0;
        diceStatus = [false, false, false, false, false];
    }
    wuerfel.forEach((w, index) => {
        if (diceStatus[index] == false) {
            let diceCount = randomInt(1, 7);
            let dicePosX = randomFloat(200, window.innerWidth - 100);
            let dicePosY = randomFloat(20, window.innerHeight - 80);
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

    //check if a Dice is colliding with another

    setTimeout(() => {

        let collisionDirection = 1;
        let collisions = 0;

        wuerfel.forEach((w1, i1) => {
            let rect1 = w1.getBoundingClientRect();
            wuerfel.forEach((w2, i2) => {
                if (i1 != i2) {
                    let rect2 = w2.getBoundingClientRect();
                    if (rect1.right < rect2.left ||
                        rect1.left > rect2.right ||
                        rect1.bottom < rect2.top ||
                        rect1.top > rect2.bottom) {
                    } else {
                        if (collisions < 2) {
                            let newPos = rect1.top - 20 * collisionDirection;
                            w1.style.top = newPos + "px";
                        } else {
                            let newPos = rect1.left - 20 * collisionDirection;
                            w1.style.left = newPos + "px";
                        }
                        collisionDirection *= -1;

                        collisions++;
                    }
                }
            });

        });

    }, 300);


    //Check if three thrown
    areThreeSameThrown();

    //Check if two 5s thrown
    areTwoFivesThrown();

    collectedPosOnTrow = collectedPos;
    firstThrow = false;
}

//select Dice

wuerfel.forEach((w, index) => {
    w.addEventListener("click", () => {
        if (!diceInCenter) {
            if (!fiveChoice) {
                if (trippleThrown) {
                    if (diceNumber[index] == trippleNumber) {
                        let trippleCounter = 0;
                        wuerfel.forEach((triple, i) => {
                            if (diceNumber[i] == trippleNumber) {
                                if (trippleCounter < 2) {
                                    selectDice(triple, i, 0, true);
                                    diceStatus[i] = true;
                                } else {
                                    if (trippleNumber != 1) {
                                        selectDice(triple, i, trippleNumber * 100, true);
                                    } else {
                                        selectDice(triple, i, 1000, true);
                                    }
                                    diceStatus[i] = true;
                                }
                                trippleCounter++;
                            }
                        });

                        trippleThrown = false;

                    } else {
                        if (diceNumber[index] == 1 && diceStatus[index] == false && diceNumber[index] != trippleNumber) {
                            selectDice(w, index, 100, true);
                            diceStatus[index] = true;
                        } else if (diceNumber[index] == 5 && diceStatus[index] == false && !doubleFive) {
                            selectDice(w, index, 50, true);
                            diceStatus[index] = true;
                        } else if (diceNumber[index] == 5 && diceStatus[index] == false && doubleFive) {
                            oneOfTwoFivesSelected(w, index, 100, true);
                            diceStatus[index] = true;
                        }
                    }
                } else {
                    if (diceNumber[index] == trippleNumber && trippleChance) {
                        if (trippleNumber != 1) {
                            selectDice(w, index, trippleNumber * 100, true);
                            diceStatus[index] = true;
                        } else {
                            selectDice(w, index, 1000, true);
                            diceStatus[index] = true;
                        }
                        anoterTrippleIsCollected = 0;
                    } else if (diceNumber[index] == 1 && diceStatus[index] == false && diceNumber[index] != trippleNumber) {
                        selectDice(w, index, 100, true);
                        diceStatus[index] = true;
                    } else if (diceNumber[index] == 5 && diceStatus[index] == false) {
                        if (doubleFive) {
                            console.log("pick two fives");
                            oneOfTwoFivesSelected(w, index, 100, true);
                        } else {
                            selectDice(w, index, 50, true);
                            diceStatus[index] = true;
                        }
                    }
                }
            } else {
                if (fivesPos[0] == index) {
                    //first
                    selectDice(w, index, 100, true);
                    diceStatus[index] = true;
                    //second
                    trowInMiddle(fivesPos[1])
                    diceStatus[fivesPos[1]] = false;
                } else if (fivesPos[1] == index) {
                    //first
                    selectDice(w, index, 50, true);
                    diceStatus[index] = true;
                    //second
                    selectDice(wuerfel[fivesPos[0]], fivesPos[0], 50, true);
                    diceStatus[fivesPos[0]] = true;
                }

                fiveChoice = false;

                wuerfel.forEach(all => {
                    all.style.backgroundColor = "black";
                });

            }
        }
    });

});

//check if there are 3 or more

function areThreeSameThrown() {
    const c = [];
    diceNumber.forEach((nr, i) => {
        if (diceStatus[i] != true) {
            c[nr] = (c[nr] || 0) + 1;
        }
    });
    //console.log(c);

    c.forEach((nr, i) => {
        if (nr >= 3) {
            trippleThrown = true;
            trippleNumber = i;
            trippleChance = true;
            anoterTrippleIsCollected = -1;
            console.log("THREEE!");
        }
    });
}

function areTwoFivesThrown() {
    if (trippleNumber != 5) {
        fivesPos = [];
        diceNumber.forEach((nr, i) => {
            if (diceStatus[i] != true) {
                if (nr == 5) {
                    fivesPos.push(i);
                }
            }
        });
        if (fivesPos.length == 2) {
            doubleFive = true;
            console.log("TWO FIVES");
        } else {
            doubleFive = false;
        }
    }

    //console.log(fivesPos);

}

//hover on Dice

wuerfel.forEach((w, index) => {
    w.addEventListener("mouseover", () => {
        if (!diceInCenter && !diceStatus[index]) {
            if (!fiveChoice) {
                if (diceNumber[index] == 1 && trippleNumber != 1) {
                    w.style.backgroundColor = "blue";
                } else if (diceNumber[index] == 5 && trippleNumber != 5) {
                    if (doubleFive) {
                        wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 1 + ".png";
                        wuerfel.forEach((doubl, i) => {
                            if (fivesPos.includes(i)) {
                                doubl.style.backgroundColor = "pink"
                            }
                        });
                    } else {
                        w.style.backgroundColor = "green";
                    }
                } else if (trippleThrown && diceNumber[index] == trippleNumber) {
                    wuerfel.forEach((trip, i) => {
                        if (diceNumber[i] == trippleNumber) {
                            trip.style.backgroundColor = "red"
                        }
                    });
                } else if (trippleChance && diceNumber[index] == trippleNumber) {
                    w.style.backgroundColor = "red";
                } else {
                    w.style.backgroundColor = "lightgray";
                };
            } else {
                if (fivesPos[0] == index) {
                    wuerfel[fivesPos[0]].style.backgroundColor = "blue"
                    wuerfelImage[fivesPos[1]].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 0 + ".png";
                } else if (fivesPos[1] == index) {
                    wuerfel[fivesPos[1]].style.backgroundColor = "green"
                    wuerfel[fivesPos[0]].style.backgroundColor = "green"
                    wuerfelImage[fivesPos[0]].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 5 + ".png";
                }
            }
        }
    });

    w.addEventListener("mouseleave", () => {
        if (!fiveChoice) {
            wuerfel.forEach((w, index) => {
                w.style.backgroundColor = "black";
                //wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + diceNumber[index] + ".png";
            });
        } else {
            wuerfel[fivesPos[0]].style.backgroundColor = "black"
            wuerfel[fivesPos[1]].style.backgroundColor = "black"
            wuerfelImage[fivesPos[0]].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 1 + ".png";
            wuerfelImage[fivesPos[1]].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 5 + ".png";
        }
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

    //console.log(isPointsCollected + " are points collected?");


    //counter
    updateCounter(c);
}

//Select one of two fives

function oneOfTwoFivesSelected(w, i, c, isPicket) {
    if (isPicket) {

        fiveChoice = true;

        wuerfel.forEach(all => {
            all.style.backgroundColor = "lightgray";
        });

        //one to one
        diceNumber[fivesPos[0]] = 1;
        wuerfel[fivesPos[0]].style.backgroundColor = "blue"
        wuerfel[fivesPos[0]].style.top = (window.innerHeight / 3) + "px";
        wuerfel[fivesPos[0]].style.left = window.innerWidth / 2 - 30 + "px";
        wuerfel[fivesPos[0]].style.transform = `rotate(0deg)`;
        wuerfel[fivesPos[0]].style.backgroundColor = "black";
        wuerfelImage[fivesPos[0]].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 1 + ".png";

        //two to fives
        diceNumber[fivesPos[1]] = 5;
        wuerfel[fivesPos[1]].style.backgroundColor = "green"
        wuerfel[fivesPos[1]].style.top = (window.innerHeight / 3) + "px";
        wuerfel[fivesPos[1]].style.left = window.innerWidth / 2 + 30 + "px";
        wuerfel[fivesPos[1]].style.transform = `rotate(0deg)`;
        wuerfel[fivesPos[1]].style.backgroundColor = "black";
        wuerfelImage[fivesPos[1]].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 5 + ".png";

    }
}

function trowInMiddle(pos) {
    wuerfel[pos].style.backgroundColor = "black";
    wuerfel[pos].style.top = (window.innerHeight / 3) + "px";
    wuerfel[pos].style.left = window.innerWidth / 2 + "px";
    wuerfel[pos].style.transform = `rotate(0deg)`;
    diceNumber[pos] = 0;
    wuerfelImage[pos].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 0 + ".png";
}



//Throw Dice Input

background.addEventListener("click", () => {

    if (!fiveChoice) {

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

        if (anoterTrippleIsCollected <= 1) {
            trippleChance = true;
        } else {
            trippleChance = false;
        }

        anoterTrippleIsCollected++;

    }

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
    //console.log(trippleThrown);
};

setInterval(intervalFunction, 1000); // jedenFrame (1ms) wird die Funktion ausgeführt

