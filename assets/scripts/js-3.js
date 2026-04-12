/*
To Dos

– Highscore Bauen (Server)

– Fruit Types
    – Speed Fruits multiplier
    – Speed Fruits divider
    – destroy Body (and Fruits)
– Reload / Pause?
– Animation effects?
– Claud Fragen was verbessern

Bugs

– Body Part spawns late + somewere on screen for 1 Sec.

*/

//Random Numbers

//Int
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
//float
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Head
let snakeHead = document.getElementById("head");
let snakeHeadPos;
let snakeHeadSize = 30; //GridSize

//speed
let speedStart = 200;
let speedMax = 100;
let speed;
let speedCount;
let direction = "up";

//BodyParts

let bodyParts = [];

//fruits
let fruits = [];
let fruitColors = [];

//colors
let colors = ["red", "blue", "green", "violet", "orange", "pink"];

//UI
const counter = document.getElementById("snakePointsCounter");
let snakePoints = 0;


//Set Snake Head Dimensions
snakeHead.style.width = snakeHeadSize + "px";
snakeHead.style.height = snakeHeadSize + "px";
snakeHead.style.top = window.innerHeight / 2 + "px";
snakeHead.style.left = window.innerWidth / 2 + "px";

let sHdRect = snakeHead.getBoundingClientRect();

//starting Position
snakeHeadStartPosY = sHdRect.y;
snakeHeadStartPosX = sHdRect.x;
//set Position
snakeHeadPosY = sHdRect.y;
snakeHeadPosX = sHdRect.x;

//create Fixed Body Parts

function addBodyPart(count, color) {
    for (let i = 0; i < count; i++) {
        const bodyPart = document.createElement("div");
        bodyPart.classList.add("bodyPart");
        bodyPart.id = "bodyPart" + bodyParts.length;
        bodyPart.style.top = 0 - 100 + "px";
        bodyPart.style.left = 0 - 100 + "px";
        bodyPart.style.width = snakeHeadSize + "px";
        bodyPart.style.height = snakeHeadSize + "px";
        bodyPart.style.backgroundColor = color;
        document.body.insertBefore(bodyPart, null);
        bodyParts.push(bodyPart);
    }
}

//create fruit

function createFruit(c) {
    for (let i = 0; i < c; i++) {
        const fruit = document.createElement("div");
        let r = randomInt(colors.length);
        fruit.classList.add("fruit");
        fruit.style.width = snakeHeadSize + "px";
        fruit.style.height = snakeHeadSize + "px";
        fruit.style.top = getRandomArbitrary(2 * snakeHeadSize, window.innerHeight - 2 * snakeHeadSize) + "px";
        fruit.style.left = getRandomArbitrary(2 * snakeHeadSize, window.innerWidth - 2 * snakeHeadSize) + "px";
        fruit.style.backgroundColor = colors[r];
        document.body.insertBefore(fruit, null);
        fruits.push(fruit);
        fruitColors.push(colors[r]);
    }
}

console.log();

//start Game

speed = speedStart;
createFruit(1);
addBodyPart(2, "black");

//Ready for Game?
//alert("SNAKE – READY?");

//document.write(snakeHead.x);

//Steps loaded on intervall

function intervalFunction() {

    var lastHeadPosX = snakeHeadPosX;
    var lastHeadPosY = snakeHeadPosY;

    //moveHead
    if (direction == "up") {
        snakeHeadPosY -= snakeHeadSize;
        snakeHead.style.top = snakeHeadPosY + "px";
    } else if (direction == "down") {
        snakeHeadPosY += snakeHeadSize;
        snakeHead.style.top = snakeHeadPosY + "px";
    } else if (direction == "left") {
        snakeHeadPosX -= snakeHeadSize;
        snakeHead.style.left = snakeHeadPosX + "px";
    } else if (direction == "right") {
        snakeHeadPosX += snakeHeadSize;
        snakeHead.style.left = snakeHeadPosX + "px";
    }

    var lastPosX;
    var lastPosY;
    var nextPosX = lastHeadPosX;
    var nextPosY = lastHeadPosY;

    //move Body
    for (let i = 0; i < bodyParts.length; i++) {

        lastPosX = bodyParts[i].getBoundingClientRect().x;
        lastPosY = bodyParts[i].getBoundingClientRect().y;
        bodyParts[i].style.top = nextPosY + "px";
        bodyParts[i].style.left = nextPosX + "px";
        nextPosX = lastPosX;
        nextPosY = lastPosY;

        //console.log(lastPosX);
    }

    //checker

    let isHeadTouchingBodyPart = isHeadTouchingBody();
    let isHeadTouchingAnyFruits = isFruitCollected();

    //console.log(isHeadTouchingAnyFruits);

    //create Fruit when collected
    if (isHeadTouchingAnyFruits) {
        createFruit(randomInt(1) + 1);
        if (speed > speedMax) {
            speed -= 10;
        }
        changeSpeed(speed);
        snakePoints++;
    }

    //lose when on Border && when touch other

    if (snakeHeadPosY <= 0
        || snakeHeadPosX <= 0
        || snakeHeadPosX >= window.innerWidth - snakeHeadSize
        || snakeHeadPosY >= window.innerHeight - snakeHeadSize
        || isHeadTouchingBodyPart
    ) {
        LoseFunction();
    }

    //UI
    snakePointsCounter.textContent = snakePoints;


    //console.log(window.innerWidth);


    //window.location.reload();

    //isFruitCollected();

}

//Check Functions

//check if fruit is Collected

function isFruitCollected() {

    let headY = snakeHeadPosY;
    let headX = snakeHeadPosX;

    for (let i = 0; i < fruits.length; i++) {

        let rect = fruits[i].getBoundingClientRect();

        if (headY >= rect.y - 30 && headY <= rect.y + snakeHeadSize + 30
            && headX >= rect.x - 30 && headX <= rect.x + snakeHeadSize + 30) {

            //add Body Part
            addBodyPart(3, fruitColors[i]);

            //remove Fruit
            fruits[i].remove();
            fruits.splice(i, 1);
            fruitColors.splice(i, 1);
            return true;
        }
    }

    return false;
}



//check if head is touching Any body part

function isHeadTouchingBody() {

    let headY = snakeHeadPosY;
    let headX = snakeHeadPosX;

    for (let i = 0; i < bodyParts.length; i++) {

        let rect = bodyParts[i].getBoundingClientRect();

        if (headY == rect.y && headX == rect.x) {
            return true;
        }
    }

    return false;
}


//States

function LoseFunction() {
    snakeHeadPosY = snakeHeadStartPosY;
    snakeHeadPosX = snakeHeadStartPosX;
    location.reload();
}

//Inputs

//Desktop && mobile

if (window.innerWidth > 900) {

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                if (direction != "right") { direction = "left" }
                break;
            case 'ArrowRight':
                if (direction != "left") { direction = "right" }
                break;
            case 'ArrowUp':
                if (direction != "down") { direction = "up" }
                break;
            case 'ArrowDown':
                if (direction != "up") { direction = "down" }
                break;
        }
        console.log(direction);
    });
} else {

    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", function (e) {
        let deltaX = e.changedTouches[0].clientX - touchStartX;
        let deltaY = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // horizontaler Swipe
            if (deltaX > 0) {
                if (direction != "left") { direction = "right" }
            } else {
                if (direction != "right") { direction = "left" }
            }
        } else {
            // vertikaler Swipe
            if (deltaY > 0) {
                if (direction != "up") { direction = "down" }
            } else {
                if (direction != "down") { direction = "up" }
            }
        }
        console.log(direction);
    });

}

//Resize Event

window.addEventListener("resize", () => {

});

//Interval

let intervalId = setInterval(intervalFunction, speed);

function changeSpeed(newSpeed) {
    clearInterval(intervalId);
    intervalId = setInterval(intervalFunction, newSpeed);
}