const screenLine1 = document.querySelector("#line1");
const screenLine2 = document.querySelector("#line2");
let showingResult = false;

function appendToScreen(text) {
    if (showingResult) {
        screenLine2.textContent = "";
        showingResult = false;
    }
    screenLine2.textContent += text;
}

function addPeriod() {
    if (screenLine2.textContent.includes(".")) return;
    
    if (showingResult) {
        screenLine2.textContent = "";
        showingResult = false;
    }
    
    if (screenLine2.textContent.length === 0) {
        screenLine2.textContent = "0.";
    } else {
        appendToScreen(".");
    }
}

function backSpace() {
    if (showingResult) {
        screenLine2.textContent = "";
        showingResult = false;

    } else if (screenLine2.textContent.length > 0) {
        screenLine2.textContent = screenLine2.textContent.slice(
            start=0, end=(screenLine2.textContent.length - 1)
        );
    } else if (screenLine1.textContent.length > 0) {
        screenLine2.textContent = screenLine1.textContent
            .split(" ")
            [0];
        screenLine1.textContent = "";
    }
}

function calculate(expression) {
    splitExpr = expression.split(" ");
    a = Number(splitExpr[0]);
    operator = splitExpr[1];
    b = Number(splitExpr[2]);

    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "×":
        case "x":
        case "*":
            return a * b;
        case "/":
        case "÷":
            return a / b;
    }
}

function equals() {
    if (screenLine2.textContent.length === 0) {
        return;
    } else if (screenLine1.textContent.length > 0) {
        if (screenLine1.textContent[screenLine1.textContent.length-1] === ".") {
            screenLine1.textContent += "0";
        }
        let result = calculate(screenLine1.textContent + " " + screenLine2.textContent);
        if (!isFinite(result) || isNaN(result)) {
            throw new Error("Attempted to divide by 0");
        } else {
            screenLine1.textContent = "";
            screenLine2.textContent = result;
            showingResult = true;
        }
    }
}

function addOperator(symbol) {
    if (screenLine2.textContent.length === 0) {
        return;
    } else if (screenLine1.textContent.length > 0) {
        try {
            equals();
        } catch (e) {
            console.error(e);
            return;
        }
    }
    showingResult = false;
    screenLine1.textContent = `${screenLine2.textContent} ${symbol}`;
    screenLine2.textContent = "";
}

document.addEventListener(("click"), (e) => {
    if (e.target.classList.contains("number")) {
        appendToScreen(e.target.textContent);
    } else if (e.target.id === "period") {
        addPeriod();
    } else if (e.target.classList.contains("operator")) {
        addOperator(e.target.textContent);
    } else if (e.target.id === "equals") {
        try {
            equals();
        } catch (e) {
            console.error(e);
        }
    } else if (e.target.id === "backspace") {
        backSpace();
    } else if (e.target.id === "clear-screen") {
        screenLine1.textContent = "";
        screenLine2.textContent = "";
    }
});

document.addEventListener("keydown", (e) => {
    if ("0123456789".includes(e.key)) {
        appendToScreen(e.key);
    } else if (e.key === ".") {
        addPeriod();
    } else if ("+-*/x".includes(e.key)) {
        addOperator(e.key);
    } else if (e.key === "=" || e.key === "Enter") {
        try {
            equals();
        } catch (e) {
            console.error(e);
        }
    } else if (e.key === "Backspace" || e.key === "Delete") {
        backSpace();
    } else if (e.key === "Escape") {
        screenLine1.textContent = "";
        screenLine2.textContent = "";
    }
})
