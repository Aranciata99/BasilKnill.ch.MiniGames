/*

– Click aside or esc to cancel
– If 2.Stack is full dont be possible to choose
– Pick the pearls from waiting list
– Unlock new Stacks with points
– Add Value to color
– Loose State
– Points

Ideas

– When 5 on BlackStack = gets deleted and + 1
– left come new pearls
– max 3 Sticks on top possible
– UI When one Destroyed -Points

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
pearlSize = 50; //in CSS defined
pearlColors = [];

//stacks

stackWidth = 50; //in CSS defined
stackHeight = 250; //in CSS defined
stacksCount = [];


function setupPlayfield(topCount, bottomCount) {

    for (let index = 0; index < topCount; index++) {

        const fillStackContainer = document.createElement("div");
        fillStackContainer.classList.add("fillStackContainer");

        const fillStackBox = document.createElement("div");
        fillStackBox.classList.add("fillStackBox");

        const fillStackStick = document.createElement("div");
        fillStackStick.classList.add("fillStackStick");
        fillStackStick.style.background = colors[randomInt(0, colors.length)];

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
            pearl.style.background = colors[rColor];
            pearl.style.bottom = pos + "px";
            stack.firstChild.appendChild(pearl);
            pos += 50;
            pearlColorStack.push(colors[rColor]);
        }
        pearlColors.push(pearlColorStack);
        stacksCount.push(r);
    });
}

//generate Level

setupPlayfield(topStackCount, bottomStackCount);
setUpStackElements();

//Update & Check Stacks

//initiate Stacks
//initiate Stacks
//initiate Stacks

const stackBox = document.querySelectorAll(".fillStackBox");
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
                if (isPearlColorFittingTargetStack(selectedBoxes[0])) {
                    //MovePearl
                    movePearlToSelectedStack(selectedBoxes[1][0], selectedBoxes[1][1]);
                    sortColorsCorrectlyNew(selectedBoxes[0][0], selectedBoxes[0][1]);
                    stacksCount[selectedBoxes[0][0]]--;
                    stacksCount[selectedBoxes[0][1]]++;
                }
                stackBox.forEach(allBoxes => {
                    removeAllBlowUp(allBoxes);
                });
                deSelectAllBoxes();
                selectedBoxes = [[], []];
            }
        }

    });
});

function sortColorsCorrectlyNew(stackNrPick, stackNrTarget) {
    let colorNrPush = pearlColors[stackNrPick].length - 1;
    pearlColors[stackNrTarget].push(pearlColors[stackNrPick][colorNrPush]);
    pearlColors[stackNrPick].pop();
    //console.log(pearlColors);

}

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

function isPearlColorFittingTargetStack(Pick) {

    pC = pearlColors[Pick[0]].length - 1;
    let pickedPearlColor = pearlColors[Pick[0]][pC];

    const pickedStack = stackBox[Pick[1]].querySelector(".fillStackStick");
    let pickedStackColor = pickedStack.style.background;

    if (pickedPearlColor == pickedStackColor || pickedStackColor == "black") {
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

//de Select Box
function deSelectAllBoxes() {
    stackBox.forEach(box => {
        box.style.background = "none";
    });
}

//Pearl Movement

let waitTimeForNextStep = 400;

function nextPearlMovingStep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function movePearlToSelectedStack(box1, box2) {

    pearlIsMoveing = true;

    spawnNewPearl();

    const pearlsOfStack1 = box1.querySelectorAll(".pearls");
    const pearlsOfStack2 = box2.querySelectorAll(".pearls");

    let distanceToCenterLine;
    let targetPosition;

    //Distances

    //Center
    const fillStackBox = document.querySelector(".fillStackBox");
    if (box1.getBoundingClientRect().top > window.innerHeight / 2) {
        distanceToCenterLine = (window.innerHeight / 2) - fillStackBox.getBoundingClientRect().top;
    } else {
        distanceToCenterLine = ((window.innerHeight / 2) - fillStackBox.getBoundingClientRect().bottom) * -1;
    }
    //x To next Stack
    const distanceToNextStack = (box2.getBoundingClientRect().left + stackWidth) - (box1.getBoundingClientRect().left + stackWidth / 2);
    //y Target
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

    //get Pearl to move
    let pearlToMove;

    pearlsOfStack1.forEach((pearl, i) => {
        if (i == pearlsOfStack1.length - 1) {
            pearlToMove = pearl;
        }
    });

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
                pearlsOfStack.forEach(pearl => {
                    pearl.classList.add("destroy");
                    setTimeout(function () {
                        pearl.remove();
                    }, 410);
                    stacksCount[i] = 0;
                    pearlColors[i] = [];
                });
            }
        }
    });

    // stackBox.forEach(stacks => {
    //     console.log(stacks);

    // });
}

//spawn a new Pearl

let pearlsOnWaiting = 0;

function spawnNewPearl() {
    const pearl = document.createElement("div");
    // let rColor = randomInt(1, 5);
    pearl.classList.add("pearls");
    pearl.style.background = colors[randomInt(0, colors.length)];
    pearl.style.bottom = newPearlsStackBox.getBoundingClientRect().height + "px";
    newPearlsStackBox.appendChild(pearl);
    if (pearlsOnWaiting < 5) {
        setTimeout(function () {
            moveNewPearlToEndOfPath(pearl);
        }, 0);
    } else {
        setTimeout(function () {
            newPearlStackIsFull(pearl)
        }, 0);
    }
};

function moveNewPearlToEndOfPath(p) {
    p.style.bottom = 50 * pearlsOnWaiting + "px";
    pearlsOnWaiting++;
}

function newPearlStackIsFull(newP) {
    const pearls = newPearlsStackBox.querySelectorAll(".pearls");

    let pearlsNewPos = 0;

    pearls.forEach((p, index) => {
        if (index == 0) {
            p.style.bottom = -100 + "px";
            p.classList.add("destroy");
            pearlsOnWaiting--;
            setTimeout(function () {
                p.remove();
            }, 410);
        } else if (index < 5) {
            p.style.bottom = pearlsNewPos * 50 + "px";
            pearlsNewPos++;
        } else {
            moveNewPearlToEndOfPath(newP);
        }
    });

}

//Update Stack after movement

function updateStacks() {

    const pearls = document.getElementById("playField").querySelectorAll(".pearls");
    let pearlCounter = 0;
    let pos = 0;

    for (let i = 0; i < stacksCount.length; i++) {
        if (stackBox[i].getBoundingClientRect().top > window.innerHeight / 2) {
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
            if (stackBox[i].getBoundingClientRect().top > window.innerHeight / 2) {
                pos += 50;
            } else {
                pos -= 50;
            }
        }
    }
}

//Resize Event

window.addEventListener("resize", () => {

});

//Interval

function intervalFunction() {

};

setInterval(intervalFunction, 2000); // jedenFrame (1ms) wird die Funktion ausgeführt

