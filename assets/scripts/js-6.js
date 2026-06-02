/*

– Farben random
– Farben für richtigen Stack
– delete when all collor on Stack

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
let bottomStackCount = 3;

//pearls

pearlSize = 50; //in CSS defined

//stacks

stackWidth = 100; //in CSS defined
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
        fillStackStick.style.background = "blue";

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
    });

    Array.from(underPlayfield.children).forEach(stack => {
        let r = randomInt(1, 5);
        let pos = 0;
        for (let index = 0; index < r; index++) {
            const pearl = document.createElement("div");
            pearl.classList.add("pearls");
            pearl.style.background = "blue";
            pearl.style.bottom = pos + "px";
            stack.firstChild.appendChild(pearl);
            pos += 50;
        }
        stacksCount.push(r);
    });
}

setupPlayfield(1, 3);
setUpStackElements();

//Update & Check Stacks

const stackBox = document.querySelectorAll(".fillStackBox");

//Inputs

let selectedBoxes = [[], []];

//Click
stackBox.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!pearlIsMoveing) {
            selectBox(box, index);
            //When two selected
            if (selectedBoxes[0].length >= 2) {
                movePearlToSelectedStack(selectedBoxes[1][0], selectedBoxes[1][1]);
                stackBox.forEach(allBoxes => {
                    removeAllBlowUp(allBoxes);
                });
                stacksCount[selectedBoxes[0][0]]--;
                stacksCount[selectedBoxes[0][1]]++;
                deSelectAllBoxes();
                selectedBoxes = [[], []];
            }
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

//Blow & unblow pearls

function blowUpPearlsOnClick(box){
    const pearls = box.querySelectorAll(".pearls");
    pearls.forEach(p => {
        p.classList.toggle("active");
    });
}

function removeAllBlowUp(box){
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
    pearlIsMoveing = false;

}

//Update Stack after movement

function updateStacks() {

    const pearls = document.querySelectorAll(".pearls");
    let pearlCounter = 0;
    let pos = 0;

    console.log(stacksCount);


    for (let i = 0; i < stacksCount.length; i++) {
        if (stackBox[i].getBoundingClientRect().top > window.innerHeight / 2) {
            pos = 0;
        } else {
            pos = stackHeight - pearlSize;
        }
        for (let p = 0; p < stacksCount[i]; p++) {
            pearls[pearlCounter].style.left = 50 + "px";
            pearls[pearlCounter].style.bottom = pos + "px";
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

