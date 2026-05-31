
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
    });
}

setupPlayfield(1, 3);
setUpStackElements();

//Inputs

const stackBox = document.querySelectorAll(".fillStackBox");
let selectedBoxes = [[], []];

stackBox.forEach((box, index) => {

    box.addEventListener("click", () => {
        if (!pearlIsMoveing) {
            selectBox(box, index);
            if (selectedBoxes[0].length >= 2) {
                movePearlToSelectedStack(selectedBoxes[1][0], selectedBoxes[1][1]);
                deSelectAllBoxes();
                selectedBoxes = [[], []];
            }
        }
    });
});

function selectBox(box, i) {
    if (box.style.background == "lightgray") {
        box.style.background = "none";

        //remove selectedBox from array
        selectedBoxes[0].forEach((number, index) => {
            if (i == number) {
                selectedBoxes[0].splice(index, 1);
                selectedBoxes[1].splice(index, 1);
            }
        });

    } else {
        if (selectedBoxes[0].length < 2) {
            box.style.background = "lightgray";
            selectedBoxes[0].push(i);
            selectedBoxes[1].push(box);
        }
    }
}

function deSelectAllBoxes() {
    stackBox.forEach(box => {
        box.style.background = "none";
    });
}

//Pearl Movement

let waitTimeForNextStep = 400;

//getDistanceToCenter

function nextPearlMovingStep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function movePearlToSelectedStack(box1, box2) {

    pearlIsMoveing = true;

    const pearlsOfStack1 = box1.querySelectorAll(".pearls");
    const pearlsOfStack2 = box2.querySelectorAll(".pearls");

    //Distances
    //Center
    const fillStackBox = document.querySelector(".fillStackBox");
    let distanceToCenterLine = (window.innerHeight / 2) - fillStackBox.getBoundingClientRect().top;
    //x To next Stack
    const distanceToNextStack = (box2.getBoundingClientRect().left + stackWidth) - (box1.getBoundingClientRect().left + stackWidth / 2);
    //y Target
    let targetPosition = 0;

    pearlsOfStack2.forEach((pearl, i) => {
        targetPosition += 50;
    });

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

    pearlIsMoveing = false;

}

//Playfields



//Resize Event

window.addEventListener("resize", () => {

});

//Interval

function intervalFunction() {

};

setInterval(intervalFunction, 2000); // jedenFrame (1ms) wird die Funktion ausgeführt

