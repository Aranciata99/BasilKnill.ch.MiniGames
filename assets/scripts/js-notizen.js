//Random Numbers

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

//Würfel

// <?php
//     $farbe = "weiss";
//     //$farbe = "schwarz";
//     $menge = 6;

//     for ($i = 1; $i < $menge + 1; $i++) {
//         echo "<div class='wuerfel'>
//         <img src='../assets/wuerfelpunkte/$farbe/wuerfel$i.png'>
//         </div>";
//     };
//     ?>

/*
//write text inside the rectangle
document.getElementById("rect").innerHTML = "Aranchiata";

//change style of the rectangle
document.getElementById("rect").style.backgroundColor = "red";

//just write in body
//document.write(5*5);

//opens Windows alert box
//alert("mit window.alert habe ich diese box geöffnet"); //window.alert();

//logging in the console
//console.log("Hallo, ich bin eine Nachricht in der Konsole");

//Print call
//window.print();

//Variabeln

//var declarations are globally scoped or function scoped while 
// let and const are block scoped.
//var variables can be updated and re-declared within its scope; 
// let variables can be updated but not re-declared; 
// const variables can neither be updated nor re-declared.
//They are all hoisted to the top of their scope. 
// Var variables are initialized with undefined, 
// let and const variables are not initialized.
//Var and let can be declared without being initialized, 
// const must be initialized during declaration.

let L = "Let = wenn die Variable später geändert werden kann";
var V = "Var";
const C = "Const = wenn die Variable nie geändert werden soll";

/*document.write(L);
document.write(C);
document.write(V);*/

/*
let a, b, c; //können mit kommas mehrere Variablen in einer Zeile deklarieren
a = "erste let variable";
b = "zweite let variable";
c = a + b; 
//oder
let d = 12, e = 13, f = d + e;

console.log(a);
console.log(b);
console.log(c);

//Variable syntax

let _privateLet = "private let variable with underscore";

*/

//functions

//Variabeln initialisieren
let a = "Funktion ausgeführt";

//Funktion
function testFunction1() {
    document.write(a);
}

//Return = Funktion wird ausgeführt, aber noch nicht dargestellt
let result = multiply(5, 10);

function multiply(x, y) {
    return x * y;
}

console.log(result);

//Funktion kann differneziert angewendet werden, Variable in Klammer kann so später anders zur anwednung kommen
let greeting = sayHello(255);

function sayHello(name) {
    return "Hello " + name;
}

console.log(greeting);

//auch mehrere Parameter möglich mit kommas

let both = twoConditions("first Condition", "second Condition");

function twoConditions(first, second) {
    return first + " " + second;
}

console.log(both);

//function if statement

let isTowerHeight = isItTaller(20);

function isItTaller(height) {
    if (height < 50) {
        return "is smaller"
    } else {
        return "is taller"
    }
}

console.log(isTowerHeight);

//summ all

let y = summAll(1, 3, 9);

function summAll() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

console.log(y);



//Funktion Callen
testFunction1()

