const button = document.getElementById("openRulesButton");
const container = document.getElementById("rulesContainer");

button.addEventListener("click", () => {
    container.classList.add('open');
});

container.addEventListener("click", () => {
    container.classList.remove('open');
});