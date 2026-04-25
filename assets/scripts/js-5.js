/*

– add Result, sonst 0
– 3er gewürfelt
– Würfel nicht übereinander

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

//count

const currentCounter = document.getElementById("currentCounter");
const counter = document.getElementById("addcounter");
let count = 0;
let absCounter = 0;
updateCounter(0);

//UI

const background = document.getElementById("background");
const takePointsButton = document.getElementById("takePointsButton");


//Setup
const wuerfel = document.querySelectorAll(".wuerfel");
const wuerfelImage = document.querySelectorAll(".wuerfel img");
let wuerfelAugenFarbe = "weiss" //"schwarz"
wuerfel.forEach((w, index) => {
    w.style.backgroundColor = "black";
    w.style.top = (window.innerHeight / 3) + (40 * index) + "px";
    w.style.left = window.innerWidth / 2 + "px";
    wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 1 + ".png";
}) //HintergrundFarbe

//throwDice

function throwDice() {

    if (collectedPos == 5){
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

    collectedPosOnTrow = collectedPos;
}

//select Dice

wuerfel.forEach((w, index) => {
    w.addEventListener("click", () => {
        if (diceNumber[index] == 1 && diceStatus[index] == false) {
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
    });
});

//hover on Dice

wuerfel.forEach((w, index) => {
    w.addEventListener("mouseover", () => {
        if (diceNumber[index] == 1) {
            w.style.backgroundColor = "blue";
        } else if (diceNumber[index] == 5) {
            w.style.backgroundColor = "green";
        } else {
            w.style.backgroundColor = "gray";
        };
    });
    w.addEventListener("mouseleave", () => {
        w.style.backgroundColor = "black";
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
    } else {
        w.style.left = diceThrowPos[0][i] + "px";
        w.style.top = diceThrowPos[1][i] + "px";
        w.style.transform = `rotate(${diceThrowPos[2][i]}deg)`;
        collectedPos--;
    }
    //counter
    updateCounter(c);
}

//Throw Dice Input

background.addEventListener("click", () => {
    throwDice();
});

//Take Points Input

takePointsButton.addEventListener("click", () => {
    absCounter += count;
    currentCounter.textContent = absCounter;
});

//Counter

function updateCounter(add) {
    count += add;
    currentCounter.textContent = absCounter;
    counter.textContent = count;
}



//Playfield


//Resize Event

window.addEventListener("resize", () => {

});

//Interval

// function intervalFunction(){

// }

// setInterval(intervalFunction, 1); // jedenFrame (1ms) wird die Funktion ausgeführt

