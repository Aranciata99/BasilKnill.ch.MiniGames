const buttons = document.querySelectorAll('.inhaltsverzeichnis button');
const fixedMargin = 25;
const randomBtnWidth = 70 + 2 * fixedMargin; //plus Margin

//random float
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function loadButtons() {
    buttons.forEach(button => {

        let buttonDimension = button.getBoundingClientRect();

        let individualMargin = buttonDimension.width / 2;
        let margin = individualMargin + fixedMargin;

        let xPos;
        let yPos;

        do {
            xPos = getRandomArbitrary(margin, window.innerWidth - margin);
            yPos = getRandomArbitrary(margin, window.innerHeight - margin);
        } while (
            (xPos > (window.innerWidth / 2) - randomBtnWidth / 2 && xPos < (window.innerWidth / 2) + randomBtnWidth / 2) &&
            (yPos > (window.innerHeight / 2) - fixedMargin && yPos < (window.innerHeight / 2) + fixedMargin)
        );

        button.style.left = xPos + "px";
        button.style.top = yPos + "px";

    });
}

loadButtons();

console.log(randomBtnWidth);
//console.log((window.innerHeight/2) + fixedMargin);


//Random Numbers

//Resize Event

window.addEventListener("resize", () => {
    loadButtons();
});

//Interval

// function intervalFunction(){

// }

// setInterval(intervalFunction, 1); // jedenFrame (1ms) wird die Funktion ausgeführt

