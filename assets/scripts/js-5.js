/*

– Würfel

*/

//Random Numbers

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

//Würfel

//Setup
const wuerfel = document.querySelectorAll(".wuerfel");
const wuerfelImage = document.querySelectorAll(".wuerfel img");
let wuerfelAugenFarbe = "weiss" //"schwarz"
wuerfel.forEach((w, index) => {
    w.style.backgroundColor = "black";
    w.style.top = window.innerHeight/3 + "px";
    w.style.left = window.innerWidth/2 + "px";
    wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + 1 + ".png";
}) //HintergrundFarbe

//throwDice

function throwDice() {
    wuerfel.forEach((w, index) => {
        let diceCount = randomInt(1, 7);
        w.style.top = randomFloat(0, window.innerHeight - 250) + "px";
        w.style.left = randomFloat(0, window.innerWidth - 50) + "px";
        let degrees = randomFloat(0, 360);
        w.style.transform = `rotate(${degrees}deg)`;
        wuerfelImage[index].src = "../assets/wuerfelpunkte/" + wuerfelAugenFarbe + "/wuerfel" + diceCount + ".png";
        return diceCount;
    });
}

window.addEventListener("click", () => {
    throwDice();
});



//Playfield


//Resize Event

window.addEventListener("resize", () => {

});

//Interval

// function intervalFunction(){

// }

// setInterval(intervalFunction, 1); // jedenFrame (1ms) wird die Funktion ausgeführt

