/*

+
– rules
– Win state of a Person

– – Testen – –

Bugs
– tripple Teils stehen geblieben
– tripple fällt weg, wenn neuer Tripple?
– Take Points gets weirldly stuck Things sometimes
– Kollisionen manchmal komisch – Logik nochmal überdenken

– Computer can pick other than dubble fives Choice

Adds
– Coice of throw all again on restart

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
let playerUIinputs = [];
let playerComputerStatus = [];
let playersTurn = 0;
let playerCounts = [];

//Game Loop
let isPointsCollected = 0;
let firstThrow = true;

//computer
let computerIsPlaying = false;


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

    setComputerToStart();

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
        let collisions = randomInt(0, 2);
        
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
                        if (collisions == 1) {
                            let newPos = rect1.top - 30 * collisionDirection;
                            w1.style.top = newPos + "px";
                        } else {
                            let newPos = rect1.left - 30 * collisionDirection;
                            w1.style.left = newPos + "px";
                        }
                        collisionDirection *= -1;
                    }

                    console.log("Collision D " + collisions);
                    
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

//select Dice input

wuerfel.forEach((w, index) => {
    w.addEventListener("click", () => {
        pickDice(w, index);
    });

});

function pickDice(w, index) {
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
                        //console.log("pick two fives");
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
                fivesPos = [];
            } else if (fivesPos[1] == index) {
                //first
                selectDice(w, index, 50, true);
                diceStatus[index] = true;
                //second
                selectDice(wuerfel[fivesPos[0]], fivesPos[0], 50, true);
                diceStatus[fivesPos[0]] = true;
                fivesPos = [];
            }

            fiveChoice = false;

            wuerfel.forEach(all => {
                all.style.backgroundColor = "black";
            });

        }
    }
}

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
            //console.log("THREEE!");
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
            //console.log("TWO FIVES");
        } else {
            doubleFive = false;
        }
    }

    //console.log(fivesPos);

}

//hover on Dice

wuerfel.forEach((w, index) => {
    w.addEventListener("mouseover", () => {
        if (!diceInCenter && !diceStatus[index] && !computerIsPlaying) {
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
        if (!computerIsPlaying) {
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

    if (!fiveChoice && !computerIsPlaying) {

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
    takePoints();
});

function takePoints() {
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
}

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
        playerUIinputs.push(playerFormInput);
        playerCounts.push(0);

        playerComputerStatus.push(false);

    }
}

function deleteLastPlayer() {
    if (playerUIslots.length > 2) {
        playerUIslots[playerUIslots.length - 1].remove();
        playerUIslots.pop();
        playerUIinputs.pop();
        playerComputerStatus.pop();
        if (playerUIslots.length == playersTurn) {
            playersTurn = 0;
            showWhoIsPlaying();
        }
    }

    // if (playerUIslots[playerUIslots.length - 1]){
    //     playersTurn

    // }
}

function checkPlayerNamesOfComputer() {
    playerUIinputs.forEach((slot, i) => {
        if (slot.value == "C+") {
            playerComputerStatus[i] = true;
        } else {
            playerComputerStatus[i] = false;
        }
    });
};

showWhoIsPlaying();

function showWhoIsPlaying() {
    playerUIslots.forEach(slots => {
        slots.style.color = "black";
        slots.firstElementChild.style.color = "black";
    });
    playerUIslots[playersTurn].style.color = "red";
    playerUIslots[playersTurn].firstElementChild.style.color = "red";

}

//Computer

let computerLoopIsRunning;
let computerTurnDelay = 750 //1s
let computerTurnStatus = 0;
let computerLoopOngoing;

function newComputerTurnDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function computerTurns() {

    console.log("Computer " + playersTurn + "Start");
    console.log("2 5s " + doubleFive);
    console.log("5 choice " + fiveChoice);


    computerIsPlaying = true;
    computerTurnStatus = 0;

    while (computerLoopIsRunning) {

        computerLoopOngoing = true;

        //0 = Throw Dice

        if (computerTurnStatus == 0 && computerLoopOngoing) {

            //console.log("computer Trow Dice");

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

            // throwDice();


            computerTurnStatus = 1;

            computerLoopOngoing = false;
        }

        //1 = Collect Dice

        if (computerTurnStatus == 1 && computerLoopOngoing) {

            if (!doubleFive) {

                //console.log("computer Collect Dice");

                wuerfel.forEach((w, index) => {
                    if (diceStatus[index] == false) {
                        pickDice(w, index);
                    }
                });

                //Logik Strategie

                if (isPointsCollected == 0) {
                    setDiceInCenter();
                    firstThrow = true;
                } else {
                    if (computerDecideToTrowAgain()) {

                        console.log("Computer Throws Again");

                        computerTurnStatus = 0;

                    } else {
                        console.log("Computer Takes Pionts");

                        computerTurnStatus = 2;
                    }
                }


            } else {
                let pickOne = true;
                wuerfel.forEach((w, index) => {
                    if (diceNumber[index] == 5 && pickOne) {
                        pickDice(w, index);
                        pickOne = false;
                    }
                });
                computerTurnStatus = 3;
            }


            computerLoopOngoing = false;
        }

        //2 = take Points in

        if (computerTurnStatus == 2 && computerLoopOngoing) {

            //console.log("computer Collect Points");
            takePoints();
            setComputerToStart();
            computerLoopOngoing = false;
            break
        }

        if (computerTurnStatus == 3 && computerLoopOngoing) {

            let diceAwaylable;

            diceStatus.forEach((status, i) => {
                if (status == false) {
                    diceAwaylable++;
                }
            });

            fiveChoice = true;

            let pickOne = true;
            wuerfel.forEach((w, index) => {
                if (index == fivesPos[0] || index == fivesPos[1]) {
                    if (diceAwaylable == 2) {
                        if (fivesPos[index] == 5 || fivesPos[1] == 5) {
                            console.log("Pick 5");
                            pickDice(w, index);
                            pickOne = false;
                        }
                    } else {
                        if (fivesPos[0] == 1 || fivesPos[1] == 1)
                            console.log("Pick 1"); {
                            pickDice(w, index);
                            pickOne = false;
                        }
                    }
                }
            });


            if (computerDecideToTrowAgain()) {

                console.log("Computer Throws Again");

                computerTurnStatus = 0;

            } else {
                console.log("Computer Takes Pionts");

                computerTurnStatus = 2;
            }
        }

        await newComputerTurnDelay(computerTurnDelay);
    }
}

function setComputerToStart() {
    computerTurnStatus;
    computerLoopIsRunning = false;
    computerIsPlaying = false;
    computerLoopOngoing = false;
}

function computerDecideToTrowAgain() {

    if (!firstThrow) {

        var possibility; //0 - 1
        //
        let diceAwaylable = 0;
        let possibleNumbers;

        //How Many Dice are Left?

        diceStatus.forEach((status, i) => {
            if (status == false) {
                diceAwaylable++;
            }
        });

        if (diceAwaylable != 0) {
            possibility = 1 / 5 * diceAwaylable + 0.2;
        } else {
            possibility = 10;
        }

        //How high is the Points

        let countDevider = 2000

        if (count < 5000) {
            countDevider -= count;
        }

        //console.log("Count" + count / countDevider);
        possibility -= count / countDevider;

        //What could be thrown

        if (trippleChance && trippleNumber != 1 && trippleNumber != 5) {
            possibleNumbers = 3;
        } else {
            possibleNumbers = 1;
        }

        //What could be thrown

        possibility *= possibleNumbers;

        //console.log("Possibility " + possibility);

        if (count < 750 && playerCounts[playersTurn] < 8500) {
            possibility = 0.9;
        }


        var randomeChanceNr = Math.random();

        //console.log("randomeChanceNr " + randomeChanceNr);

        //true –> throw again


        if (randomeChanceNr < possibility) {
            return true;
        } else {
            return false;
        };

    } else {

        return true;

    }
}

//Playfield

//Resize Event

window.addEventListener("resize", () => {

});

//Interval

function intervalFunction() {
    checkPlayerNamesOfComputer();
    if (playerComputerStatus[playersTurn]) {

        if (!computerIsPlaying) {
            setTimeout(() => {
                computerLoopIsRunning = true;
                computerTurns();
            }, 1000);
        }

        computerIsPlaying = true;
    }
};

setInterval(intervalFunction, 2000); // jedenFrame (1ms) wird die Funktion ausgeführt

