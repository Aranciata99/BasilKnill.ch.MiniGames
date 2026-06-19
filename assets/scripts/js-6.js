/*

– Responsif
– Highscore

*/


//Random Numbers

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

//inputControll

let pearlIsMoveing = false;

//Playfield

const upperPlayfield = document.getElementById("upperPlayfield");
const underPlayfield = document.getElementById("underPlayfield");

//Gameplay Stats

let topStackCount = 3;
let bottomStackCount = 5;

//pearls

let colors = ["red", "blue", "green", "violet", "orange"];
let pearlPoints = [5, 10, 20, 50, 100];
pearlSize = 50; //in CSS defined
pearlColors = [];

//stacks

stackWidth = 50; //in CSS defined
stackHeight = 250; //in CSS defined
stacksCount = [];
//locked or not – colors – costs
stackStatus = [[true, false, true, false, true, true, true, true, true], [0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

//UI

const counterUI = document.getElementById("counter");
const restartButton = document.getElementById("restartGameButton");
// const newPearlButton = document.getElementById("newPearlButton");

//Points

let points = 0;
let lockMultiplicator = 1;
let topStackMultiplier = 5;
addPoints(0);

const topStackMultiplierText = document.getElementById("topStackMultiplier");
topStackMultiplierText.textContent = topStackMultiplier;

// –!– //
// –!– //
// –!– //

//Dev Settings
setAllPearlAndStacksOnSameColor = false;
devSettingColor = 1;

// –!– //
// –!– //
// –!– //

function setupPlayfield(topCount, bottomCount) {

    for (let index = 0; index < topCount; index++) {

        const fillStackContainer = document.createElement("div");
        fillStackContainer.classList.add("fillStackContainer");

        const fillStackBox = document.createElement("div");
        fillStackBox.classList.add("fillStackBox");

        const fillStackStick = document.createElement("div");
        fillStackStick.classList.add("fillStackStick");
        if (setAllPearlAndStacksOnSameColor) {
            fillStackStick.style.background = colors[devSettingColor];
            stackStatus[1].push(colors[devSettingColor]);
        } else {
            let rColor = randomNotSameColor();
            fillStackStick.style.background = rColor;
            stackStatus[1].push(rColor);
        }

        upperPlayfield.appendChild(fillStackContainer);
        fillStackContainer.appendChild(fillStackBox);
        fillStackBox.appendChild(fillStackStick);

        //lock Stacks up
        if (!stackStatus[0][index + 1]) {
            lockStack(fillStackBox, index + 1, randomInt(50, 1000))
        }
    }

    for (let index = 0; index < bottomCount; index++) {

        const fillStackContainer = document.createElement("div");
        fillStackContainer.classList.add("fillStackContainer");

        const fillStackBox = document.createElement("div");
        fillStackBox.classList.add("fillStackBox");

        const fillStackStick = document.createElement("div");
        fillStackStick.classList.add("fillStackStick");
        fillStackStick.style.background = "black";

        underPlayfield.appendChild(fillStackContainer);
        fillStackContainer.appendChild(fillStackBox);
        fillStackBox.appendChild(fillStackStick);

        stackStatus[1].push("black");

        //lock Stacks up
        if (!stackStatus[0][index + 4]) {
            lockStack(fillStackBox, index + 4, randomInt(5, 100))
        }
    }
}

function setUpStackElements() {

    //newPearlBox
    stacksCount.push(0);
    pearlColors.push([]);

    Array.from(upperPlayfield.children).forEach(stack => {
        stacksCount.push(0);
        pearlColors.push([]);
    });

    Array.from(underPlayfield.children).forEach(stack => {
        let r = randomInt(1, 5);
        let pearlColorStack = [];
        let pos = 0;
        for (let index = 0; index < r; index++) {
            const pearl = document.createElement("div");
            let rColor = randomInt(0, colors.length);
            pearl.classList.add("pearls");
            pearl.style.bottom = pos + "px";
            stack.firstChild.appendChild(pearl);
            pos += 50;
            if (setAllPearlAndStacksOnSameColor) {
                pearl.style.background = colors[devSettingColor];
                pearlColorStack.push(colors[devSettingColor]);
            } else {
                pearl.style.background = colors[rColor];
                pearlColorStack.push(colors[rColor]);
            }
        }
        pearlColors.push(pearlColorStack);
        stacksCount.push(r);
    });
}

//generate Level
function generateNewLevel() {
    setupPlayfield(topStackCount, bottomStackCount);
    setUpStackElements();
}

generateNewLevel();

//Update & Check Stacks

//initiate Stacks
//initiate Stacks
//initiate Stacks

const stackBox = document.querySelectorAll(".fillStackBox");
const stackContainer = document.querySelectorAll(".fillStackContainer");
const newPearlsStackBox = document.getElementById("pearlsPathBox");

//initiate Stacks
//initiate Stacks
//initiate Stacks

//Inputs

let selectedBoxes = [[], []];

//Click

stackBox.forEach((box, index) => {
    box.addEventListener("click", () => {

        if (!pearlIsMoveing) {

            if (stackStatus[0][index]) {

                selectBox(box, index);

                //When two selected
                if (selectedBoxes[0].length >= 2) {
                    if (isPearlColorFittingTargetStack(selectedBoxes[0]) && isSecondBoxNotFull(selectedBoxes[0])) {
                        //Spawn New Pearl
                        spawnNewPearl(selectedBoxes[0][0] == 0);
                        //MovePearl
                        movePearlToSelectedStack(selectedBoxes[1][0], selectedBoxes[1][1]);
                        sortColorsCorrectlyNew(selectedBoxes[0][0], selectedBoxes[0][1]);
                        stacksCount[selectedBoxes[0][0]]--;
                        stacksCount[selectedBoxes[0][1]]++;
                    }
                    selectionCanceled();
                }
            } else {

                //stack is locked

                if (stackStatus[2][index] <= points) {
                    unlockStack(box, index);
                } else {
                    shakeLockError(box, index);
                }
            }
        }

    });
});

//Escape the Selection

window.addEventListener("keyup", function (event) {
    if (event.key === "Escape") {
        selectionCanceled();
    }
});

const pathContainer = document.getElementById("newPearlsPath");
const background = document.getElementById("background");

stackContainer.forEach((container, index) => {
    container.addEventListener("click", (event) => {
        if (event.target === container) {
            selectionCanceled();
        }
    });
});

pathContainer.addEventListener("click", (event) => {
    if (event.target === pathContainer) {
        selectionCanceled();
    }
});

background.addEventListener("click", (event) => {
    if (event.target === background) {
        selectionCanceled();
    }
});

//Escape Function

function selectionCanceled() {
    stackBox.forEach(allBoxes => {
        removeAllBlowUp(allBoxes);
        allBoxes.style.background = "none";
    });
    selectedBoxes = [[], []];
}

function sortColorsCorrectlyNew(stackNrPick, stackNrTarget) {

    if (stackNrPick != 0) {
        let colorNrPush = pearlColors[stackNrPick].length - 1;
        pearlColors[stackNrTarget].push(pearlColors[stackNrPick][colorNrPush]);
        pearlColors[stackNrPick].pop();
    } else {
        pearlColors[stackNrTarget].push(pearlColors[0][0]);
        pearlColors[stackNrPick].shift();
    }

}

//mouse over Feedback

stackBox.forEach((box, i) => {
    // console.log(box);
    box.addEventListener("mouseenter", () => {
        if (stacksCount[i] > 0) {
            stick = box.querySelector(".fillStackStick");
            stick.classList.add("hover");
        }

    });
    box.addEventListener("mouseleave", () => {
        if (stacksCount[i] > 0) {
            stick = box.querySelector(".fillStackStick");
            stick.classList.remove("hover");
        }
    });
});

//SelectBox

function selectBox(box, i) {

    if (stacksCount[i] > 0 || selectedBoxes[0].length > 0) {


        if (box.style.background == "white") {
            //deselct if allready selected
            box.style.background = "none";
            blowUpPearlsOnClick(box);

            //remove selectedBox from array
            selectedBoxes[0].forEach((number, index) => {
                if (i == number) {
                    selectedBoxes[0].splice(index, 1);
                    selectedBoxes[1].splice(index, 1);
                }
            });

        } else {
            if (selectedBoxes[0].length < 2) {
                blowUpPearlsOnClick(box);
                box.style.background = "white";
                selectedBoxes[0].push(i);
                selectedBoxes[1].push(box);
            }
        }
    }
}

function isPearlColorFittingTargetStack(pick) {

    if (pick[0] == 0) {
        pC = 0;
    } else {
        pC = pearlColors[pick[0]].length - 1;
    }

    let pickedPearlColor = pearlColors[pick[0]][pC];

    const pickedStack = stackBox[pick[1]].querySelector(".fillStackStick");
    let pickedStackColor = pickedStack.style.background;

    if (pickedPearlColor == pickedStackColor || pickedStackColor == "black") {
        return true
    } else {
        return false
    }
}

function isSecondBoxNotFull(pick) {

    if (stacksCount[pick[1]] < 5) {
        return true
    } else {
        return false
    }

}

//Blow & unblow pearls

function blowUpPearlsOnClick(box) {
    const pearls = box.querySelectorAll(".pearls");
    pearls.forEach(p => {
        p.classList.toggle("active");
    });
}

function removeAllBlowUp(box) {
    const pearls = box.querySelectorAll(".pearls");
    pearls.forEach(p => {
        p.classList.remove("active");
    });
}

//Pearl Movement

let waitTimeForNextStep = 400;

function nextPearlMovingStep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function movePearlToSelectedStack(box1, box2) {

    pearlIsMoveing = true;

    const pearlsOfStack1 = box1.querySelectorAll(".pearls");
    const pearlsOfStack2 = box2.querySelectorAll(".pearls");

    let distanceToCenterLine;
    let targetPosition;

    //get Pearl to move
    let pearlToMove;


    pearlsOfStack1.forEach((pearl, i) => {
        if (box1.getBoundingClientRect().top != 0) {
            if (i == pearlsOfStack1.length - 1) {
                pearlToMove = pearl;
            }
        } else {
            if (i == 0) {
                pearlToMove = pearl;
            }
        }

    });

    //get Point from newPealrs stack
    if (box1.id == "pearlsPathBox") {

        colors.forEach((c, ci) => {
            if (c == pearlToMove.style.background) {
                addPoints(pearlPoints[ci]);
                popUpPoints(target, pearlPoints[ci], colors[ci]);
            }

        });


        // addPoints(pearlPoints[colorIndexOfStack]);
        // popUpPoints(pearl, pearlPoints[colorIndexOfStack]);
    }

    //Distances

    //Center
    const fillStackBox = document.querySelector(".upperPlayfield .fillStackBox");

    if (box1.getBoundingClientRect().top < window.innerHeight / 2 || box1.getBoundingClientRect().top == 0) {
        distanceToCenterLine = ((window.innerHeight / 2) - box1.getBoundingClientRect().bottom) * -1;
    } else {
        distanceToCenterLine = (window.innerHeight / 2) - fillStackBox.getBoundingClientRect().top;
    }

    //x To next Stack
    const distanceToNextStack = (box2.getBoundingClientRect().left + stackWidth) - (box1.getBoundingClientRect().left + stackWidth / 2);

    //y Target

    if (box1.getBoundingClientRect().top != 0) {

        if (box1.getBoundingClientRect().top > window.innerHeight / 2) {
            targetPosition = 0;
        } else {
            targetPosition = (window.innerHeight / 2) * -1;
        }

        if (box2.getBoundingClientRect().top > window.innerHeight / 2) {
            pearlsOfStack2.forEach((pearl, i) => {
                targetPosition += 50;
            });
        } else {
            targetPosition = (distanceToCenterLine * 2 - pearlSize);
            pearlsOfStack2.forEach((pearl, i) => {
                targetPosition -= 50;
            });
        }

    } else {
        if (box2.getBoundingClientRect().top > window.innerHeight / 2) {
            targetPosition = (box2.getBoundingClientRect().bottom - box1.getBoundingClientRect().bottom) * -1;
        } else {
            targetPosition = box1.getBoundingClientRect().bottom - fillStackBox.getBoundingClientRect().top - 50;
        }

        if (box2.getBoundingClientRect().top > window.innerHeight / 2) {
            pearlsOfStack2.forEach((pearl, i) => {
                targetPosition += 50;
            });
        } else {
            pearlsOfStack2.forEach((pearl, i) => {
                targetPosition -= 50;
            });
        }

    }

    //movement

    //move to Center

    pearlToMove.style.bottom = distanceToCenterLine - pearlSize / 2 + "px";

    await nextPearlMovingStep(waitTimeForNextStep);

    //move to target Stack

    pearlToMove.style.left = distanceToNextStack + "px";

    await nextPearlMovingStep(waitTimeForNextStep);

    //move down

    pearlToMove.style.bottom = targetPosition + "px";

    await nextPearlMovingStep(waitTimeForNextStep);

    updateStacks();
    checkIfAnyStackIsFull();
    pearlIsMoveing = false;
}

//check Stacks

function checkIfAnyStackIsFull() {

    stacksCount.forEach((stackCount, i) => {
        if (i != 0) {

            if (stackCount == 5) {
                const pearlsOfStack = stackBox[i].querySelectorAll(".pearls");
                let firstColor;
                let sameColorCount = 0;
                pearlsOfStack.forEach((pearl, c) => {
                    if (c == 0) {
                        firstColor = pearl.style.background;
                        sameColorCount++;
                    } else if (pearl.style.background == firstColor) {
                        sameColorCount++;
                    }
                });

                if (sameColorCount == 5) {
                    removeStackOfPearls(pearlsOfStack, i, stackBox[i].getBoundingClientRect().top < window.innerHeight / 2, firstColor)
                    if (stackBox[i].getBoundingClientRect().top < window.innerHeight / 2) {
                        setTimeout(function () {
                            lockStack(stackBox[i], i, Math.floor(points + randomInt(50, 1000) * lockMultiplicator))
                        }, 450);
                    } else {
                        setTimeout(function () {
                            lockStack(stackBox[i], i, Math.floor(points + randomInt(5, 100) * lockMultiplicator))
                        }, 450);
                    }
                }
            }
        }
    });

}

//Remove Pearls

function removeStackOfPearls(pearlsOfStack, i, isTopStack, color) {

    let colorIndexOfStack = colors.indexOf(color);

    pearlsOfStack.forEach(pearl => {
        pearl.classList.add("destroy");
        setTimeout(function () {
            pearl.remove();
        }, 410);
        stacksCount[i] = 0;
        pearlColors[i] = [];
        if (!isTopStack) {
            addPoints(pearlPoints[colorIndexOfStack]);
            popUpPoints(pearl, pearlPoints[colorIndexOfStack]);
        } else {
            addPoints(pearlPoints[colorIndexOfStack] * topStackMultiplier);
            popUpPoints(pearl, pearlPoints[colorIndexOfStack] * topStackMultiplier);
        }
    });

    if (isTopStack) {
        stackStatus[1][i] = randomNotSameColor();
    }
}

//random Color But not same

function randomNotSameColor() {
    let newColorOfStack;
    do {
        newColorOfStack = colors[randomInt(0, colors.length)];

    } while (stackStatus[1].includes(newColorOfStack));

    return newColorOfStack;
}

//spawn a new Pearl

let pearlsOnWaiting = 0;
let pearlIsSpawned = false;

function spawnNewPearl(newPearlSelected) {

    pearlIsSpawned = true;

    //If Statement = only spawn when not from new stack

    if (pearlsOnWaiting < 5 || newPearlSelected) {

        if (newPearlSelected) {
            pearlsOnWaiting--;
            const newPearls = newPearlsStackBox.querySelectorAll(".pearls");

            for (let index = 0; index < newPearls.length; index++) {
                newPearls[index].style.bottom = index * 50 - 50 + "px";
            }
        }

        //if (!newPearlSelected) {
        const pearl = document.createElement("div");
        let r = randomInt(0, colors.length);
        // let rColor = randomInt(1, 5);
        pearl.classList.add("pearls");
        if (setAllPearlAndStacksOnSameColor) {
            pearl.style.background = colors[devSettingColor];
        } else {
            pearl.style.background = colors[r];
        }
        pearl.style.bottom = newPearlsStackBox.getBoundingClientRect().height + "px";
        newPearlsStackBox.appendChild(pearl);

        stacksCount[0] += 1;
        if (setAllPearlAndStacksOnSameColor) {
            pearlColors[0].push(colors[devSettingColor]);
        } else {
            pearlColors[0].push(colors[r]);
        }

        // if stack shoul not add
        setTimeout(function () {
            moveNewPearlToEndOfPath(pearl);
        }, 0);


    }

    //check if stack is full

    // if (pearlsOnWaiting < 5) {
    //     setTimeout(function () {
    //         moveNewPearlToEndOfPath(pearl);
    //     }, 0);
    // } else {
    //     setTimeout(function () {
    //         newPearlStackIsFull(pearl)
    //     }, 0);
    // }

    //} else {
    //     pearlsOnWaiting--;
    //     const newPearls = newPearlsStackBox.querySelectorAll(".pearls");

    //     for (let index = 0; index < newPearls.length; index++) {
    //         newPearls[index].style.bottom = index * 50 - 50 + "px";
    //     }
    // }

    setTimeout(function () {
        pearlIsSpawned = false;
    }, 500);
};

function moveNewPearlToEndOfPath(p) {
    p.style.bottom = 50 * pearlsOnWaiting + "px";
    pearlsOnWaiting++;
}

const target = document.getElementById("targetRemovePointsUI");

function newPearlStackIsFull(newP) {
    let pearlsNewPos = 0;

    newPearlsStackBox.querySelectorAll(".pearls").forEach((p, index) => {
        if (index == 0) {
            p.style.bottom = -100 + "px";
            p.classList.add("destroy");
            pearlsOnWaiting--;
            stacksCount[0] -= 1;
            //TakePearlPoints

            // colors.forEach((c, ci) => {
            //     if (c == p.style.background) {
            //         takePoints(pearlPoints[ci]);
            //         popUpPoints(target, pearlPoints[ci] * -1, "darkred");
            //         console.log(p);
            //     }

            // });

            //Delete Pearl
            setTimeout(function () {
                p.remove();
            }, 400);
        } else if (index < 5) {
            p.style.bottom = pearlsNewPos * 50 + "px";
            pearlsNewPos++;
        } else {
            moveNewPearlToEndOfPath(newP);
        }
    });

    pearlColors[0].shift();

}

//Update Stack after movement

function updateStacks() {

    const pearls = document.querySelectorAll(".pearls");
    let pearlCounter = 0;
    let pos = 0;


    for (let i = 0; i < stacksCount.length; i++) {
        if (stackBox[i].getBoundingClientRect().top > window.innerHeight / 2 || i == 0) {
            pos = 0;
        } else {
            pos = stackHeight - pearlSize;
        }

        for (let p = 0; p < stacksCount[i]; p++) {
            pearls[pearlCounter].style.left = 25 + "px";
            pearls[pearlCounter].style.bottom = pos + "px";
            pearls[pearlCounter].style.background = pearlColors[i][p];
            stackBox[i].appendChild(pearls[pearlCounter]);
            pearlCounter++;

            if (stackBox[i].getBoundingClientRect().top > window.innerHeight / 2 || i == 0) {
                pos += 50;
            } else {
                pos -= 50;
            }
        }
    }
}

//lock & Unlock Functions

function lockStack(box, index, cost) {

    const stick = box.querySelector(".fillStackStick")
    stick.style.background = "lightgray";

    const lock = document.createElement("button");
    lock.classList.add("lockedStickButton");
    lock.style.background = stackStatus[1][index];
    lock.style.border = "solid " + stackStatus[1][index] + " var(--buttonBorderSize)";

    lock.textContent = cost;
    stackStatus[0][index] = false;
    stackStatus[2][index] = cost;

    stick.appendChild(lock);

    // console.log(stackStatus);
}

function unlockStack(box, index) {

    const stick = box.querySelector(".fillStackStick")
    stick.style.background = stackStatus[1][index];

    const lock = box.querySelector(".lockedStickButton");
    lock.classList.add("disapear");

    setTimeout(function () {
        lock.remove();
    }, 1000);

    stackStatus[0][index] = true;
    //takePoints(stackStatus[2][index])
    stackStatus[2][index] = 0;

    // console.log(stackStatus);
}

function shakeLockError(box, index) {
    const lock = box.querySelector(".lockedStickButton");
    lock.classList.add("shakeAnimation");

    setTimeout(function () {
        lock.classList.remove("shakeAnimation");
    }, 400);

}

//UI Function

//points get UX

function popUpPoints(pearl, points, color) {
    let x = pearl.getBoundingClientRect().right + 10;
    let y = pearl.getBoundingClientRect().bottom - 20;

    const pointPopup = document.createElement("small");
    pointPopup.classList.add("pointsPopup");
    pointPopup.style.left = x + "px";
    pointPopup.style.top = y + "px";
    pointPopup.style.color = color;
    document.body.appendChild(pointPopup);
    pointPopup.textContent = points;

    setTimeout(function () {
        pointPopup.classList.add("fading");
        y -= 50;
        pointPopup.style.top = y + "px";
    });

    setTimeout(function () {
        pointPopup.remove();
    }, 400);
}

//Points Counter

function addPoints(pointsAdded) {
    points += pointsAdded;
    counterUI.textContent = points;

    updateDifficulty();
}

function takePoints(pointsTaken) {
    points -= pointsTaken;
    if (points > 0) {
        counterUI.textContent = points;
    } else {
        points = 0;
        counterUI.textContent = points;
    }

    updateDifficulty();
}

//difficulty

function updateDifficulty() {

    let difficultyPoints = points / 5000;
    lockMultiplicator = 1 + difficultyPoints;

    console.log(difficultyPoints + " " + lockMultiplicator);

}

//spawn new pearl Button

// newPearlButton.addEventListener("click", () => {
//     if (!pearlIsSpawned) {
//         spawnNewPearl();
//     };
// });

//Restart Button

restartButton.addEventListener("click", () => {

    location.reload();

});

//Resize Event

window.addEventListener("resize", () => {

});

//Interval

function intervalFunction() {
    // console.log(stacksCount);
};

setInterval(intervalFunction, 5000); // jedenFrame (1ms) wird die Funktion ausgeführt

