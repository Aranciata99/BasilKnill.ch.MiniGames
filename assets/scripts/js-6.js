/*

– Desk : hover over feedback

– Game Design: 
    – Generall – how does it work expand etc?
    – Unlock new Stacks with points
    – Loose State
    – Failstate
    – more Punish

Ideas/Extras

– Add new Pearl Button
– Punish on pick from left stack
– UI When one Destroyed -Points
– Wrong picks (stack full & wrong color = -Points)
– more picks when in row
– On hover Stack response

Bugs

– sometimes, the pearl on path disapear

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

let topStackCount = 1;
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

//UI

const counterUI = document.getElementById("counter");
const restartButton = document.getElementById("restartGameButton");

//Points

let points = 0;
addPoints(0);

// –!– //
// –!– //
// –!– //

//Dev Settings
setAllPearlAndStacksOnSameColor = false;
devSettingColor = 0;

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
        } else {
            fillStackStick.style.background = colors[randomInt(0, colors.length)];
        }

        upperPlayfield.appendChild(fillStackContainer);
        fillStackContainer.appendChild(fillStackBox);
        fillStackBox.appendChild(fillStackStick);

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

//////// XXX ////////

// xw.addEventListener("mouseover", () => {

// });

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
            addPoints(pearlPoints[colorIndexOfStack] * 10);
            popUpPoints(pearl, pearlPoints[colorIndexOfStack] * 10);
        }
    });

    if (isTopStack) {
        console.log("newColor");
        const stick = stackBox[i].querySelector(".fillStackStick");
        stick.style.background = colors[randomInt(0, colors.length)];
    }
}

//spawn a new Pearl

let pearlsOnWaiting = 0;

function spawnNewPearl(newPearlSelected) {
    if (!newPearlSelected) {
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

        if (pearlsOnWaiting < 5) {
            setTimeout(function () {
                moveNewPearlToEndOfPath(pearl);
            }, 0);
        } else {
            setTimeout(function () {
                newPearlStackIsFull(pearl)
            }, 0);
        }

    } else {
        pearlsOnWaiting--;
        const newPearls = newPearlsStackBox.querySelectorAll(".pearls");

        for (let index = 0; index < newPearls.length; index++) {
            newPearls[index].style.bottom = index * 50 - 50 + "px";
        }
    }
};

function moveNewPearlToEndOfPath(p) {
    p.style.bottom = 50 * pearlsOnWaiting + "px";
    pearlsOnWaiting++;
}

function newPearlStackIsFull(newP) {
    let pearlsNewPos = 0;

    newPearlsStackBox.querySelectorAll(".pearls").forEach((p, index) => {
        if (index == 0) {
            p.style.bottom = -100 + "px";
            p.classList.add("destroy");
            pearlsOnWaiting--;
            stacksCount[0] -= 1;
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

//UI Function

//points get UX

function popUpPoints(pearl, points) {
    let x = pearl.getBoundingClientRect().right + 10;
    let y = pearl.getBoundingClientRect().bottom - 20;
    
    const pointPopup = document.createElement("small");
    pointPopup.classList.add("pointsPopup");
    pointPopup.style.left = x + "px";
    pointPopup.style.top = y + "px";
    document.body.appendChild(pointPopup);
    pointPopup.textContent = points;

    setTimeout(function () {
        pointPopup.classList.add("fading");
        y -= 50;
        pointPopup.style.top = y + "px";
    });

    setTimeout(function () {
        pointPopup.remove();
    }, 1000);
}


//Points Counter

function addPoints(pointsAdded) {
    points += pointsAdded;
    counterUI.textContent = points;
}

function takePoints(pointsTaken) {
    points -= pointsTaken;
    counterUI.textContent = points;
}

//Restart Button

restartButton.addEventListener("click", () => {
    //clear Arrays
    stacksCount = [];
    pearlColors = [];
    selectedBoxes = [[], []];

    //clear Divs
    const allPearls = document.querySelectorAll(".pearls");
    allPearls.forEach(pearls => {
        pearls.remove();
    });
    upperPlayfield.innerHTML = "";
    underPlayfield.innerHTML = "";

    //generate
    generateNewLevel();

    //clear Points
    points = 0;
    counterUI.textContent = points;
});

//Resize Event

window.addEventListener("resize", () => {

});

//Interval

function intervalFunction() {

};

setInterval(intervalFunction, 2000); // jedenFrame (1ms) wird die Funktion ausgeführt

