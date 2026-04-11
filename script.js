const screenLine1 = document.querySelector("#line1");
const screenLine2 = document.querySelector("#line2");

function appendToScreen(text) {
    screenLine2.textContent += text;
}

function addPeriod() {
    if (!screenLine2.textContent.includes(".")) {
        appendToScreen(".");
    }
}