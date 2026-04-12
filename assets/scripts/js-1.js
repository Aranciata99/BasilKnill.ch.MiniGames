//slider

const speedSlider = document.getElementById("Speed");
const countSlider = document.getElementById("Count");
const textSlider = document.getElementById("Text");

//rectangles

let rectCount = countSlider.value;

let leftPos = [];
let topPos = [];
let moveXdirection = [];
let moveYdirection = [];

let rectText = ["<3", "^^", ":)", ":,(", ":-/", "–.–"];

let rectSize = 50;

//initial Start Positions

function initializeRectangles() {
    for (let i = 0; i < rectCount; i++) {

        const rectDivs = document.createElement("div");
        rectDivs.classList.add("rect");
        document.body.insertBefore(rectDivs, null);

        leftPos.push(Math.random() * (window.innerWidth - rectSize));
        moveXdirection.push(Math.random() > 0.5 ? 1 : -1);
        topPos.push(Math.random() * (window.innerHeight - rectSize));
        moveYdirection.push(Math.random() > 0.5 ? 1 : -1);
    }

    //console.log(topPos);

    const rects = document.querySelectorAll('.rect');

    //initial position of the rects

    let r = 0;

    rects.forEach((rect) => {

        rect.innerHTML = rectText[0];
        rect.style.height = rectSize + "px";
        rect.style.width = rectSize + "px";
        rect.style.left = leftPos[r] + "px";
        rect.style.top = topPos[r] + "px";

        r++;
    });
}

initializeRectangles();

r = 0;

function intervalFunction() {
    moveRight();

    if (rectCount != countSlider.value) {

        const rects = document.querySelectorAll('.rect');

        // console.log("jetzt");
        rects.forEach((rect) => {
            rect.remove();
        });
        initializeRectangles();
    }

    rectCount = countSlider.value;

    //console.log(rectCount + " " + countSlider.value);
}

function moveRight() {

    let rectMoveSpeed = speedSlider.value;
    const rects = document.querySelectorAll('.rect');

    rects.forEach((rect) => {

        //change Direction if border is reached

        if (leftPos[r] > window.innerWidth - rectSize || leftPos[r] < 0) {
            moveXdirection[r] *= -1;
            rect.innerHTML = rectText[textSlider.value - 1];
        }

        if (topPos[r] > window.innerHeight - rectSize || topPos[r] < 0) {
            moveYdirection[r] *= -1;
            rect.innerHTML = rectText[textSlider.value - 1];
        }

        //keep in window

        if (leftPos[r] > window.innerWidth - rectSize) {
            leftPos[r] = window.innerWidth - rectSize;
        }

        if (topPos[r] > window.innerHeight - rectSize) {
            topPos[r] = window.innerHeight - rectSize;
        }

        leftPos[r] += rectMoveSpeed * moveXdirection[r];
        topPos[r] += rectMoveSpeed * moveYdirection[r];

        r++;
    });

    r = 0;

    adaptValues();

}

function adaptValues() {
    const rects = document.querySelectorAll('.rect');
    rects.forEach((rect) => {
        rect.style.left = leftPos[r] + "px";
        rect.style.top = topPos[r] + "px";
        r++;
    });

    r = 0;
}



setInterval(intervalFunction, 1); // jedenFrame (1ms) wird die Funktion ausgeführt