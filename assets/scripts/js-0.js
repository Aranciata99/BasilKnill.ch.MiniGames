const buttons = document.querySelectorAll('.inhaltsverzeichnis button');
const fixedMargin = 25;
const randomBtnWidth = 70 + 2 * fixedMargin; //plus Margin

const sortButton = document.getElementById("indexSortButton");

let ListPosition = [];


//random float
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function loadButtons() {
    buttons.forEach((button, i) => {

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

        //push listposition
        ListPosition.push(sortButton.getBoundingClientRect().top + (25 * i));

    });
}

//Sort Buttons in List
sortButton.addEventListener("click", () => {
    sortButton.style.transition = "0.4s ease";
    sortButton.style.top = 50 + "px";
    sortButton.style.opacity = 0;

    getButtonsInList();

    setTimeout(function () {
        sortButton.style.display = "none";
    }, 400);
    console.log("sort");
});

function getButtonsInList() {
    buttons.forEach((button, i) => {
        setTimeout(function () {
            button.style.transition = "0.8s ease";
            button.style.transform = "none";
            button.style.left = fixedMargin + "px";
            button.style.top = ListPosition[i] + "px";
            setTimeout(function () {
                button.style.transition = "0s ease";
            }, 800);
        }, 100 * i);
    });


}

loadButtons();

console.log(randomBtnWidth);

//Resize Event

window.addEventListener("resize", () => {
    loadButtons();
});