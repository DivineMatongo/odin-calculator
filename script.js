// Top and bottom lines of the screen
const screenLine1 = document.querySelector("#line1");
const screenLine2 = document.querySelector("#line2");

// True when the number on the screen is the result of a previous calculation
let showingResult = false;

/**
 * Appends text to the bottom line of the screen
 * 
 * @param {string} text - string to be appended to the screen
 */
function appendToScreen(text) {
    // If the screen is showing the result of a previous calculation, it
    // must first be cleared before new text is added
    if (showingResult) {
        screenLine2.textContent = "";
        showingResult = false;
    }
    screenLine2.textContent += text;
}

/** Adds a decimal point to the number on the screen */
function addPeriod() {
    // Check if number already has a decimal point
    if (screenLine2.textContent.includes(".")) return;
    // If a previous result is being displayed, screen must first be cleared
    if (showingResult) {
        screenLine2.textContent = "";
        showingResult = false;
    }
    if (screenLine2.textContent.length === 0) {
        // Prefix 0 if there is no number on the screen
        screenLine2.textContent = "0.";
    } else {
        appendToScreen(".");
    }
}

/** Deletes last digit or operator entered on the screen */
function backSpace() {
    // Clear whole screen if previous result is being displayed
    if (showingResult) {
        screenLine2.textContent = "";
        showingResult = false;
    
    } else if (screenLine2.textContent.length > 0) {
        screenLine2.textContent = screenLine2.textContent.slice(
            start=0, end=(screenLine2.textContent.length - 1)
        );
    // An operator was the last thing entered on the screen
    } else if (screenLine1.textContent.length > 0) {
        // Remove operator and push number back down to bottom line of the screen
        screenLine2.textContent = screenLine1.textContent.split(" ")[0];;
        screenLine1.textContent = "";
    }
}

/** 
 * Evaluates a mathematical expression in string format and returns result
 * @param {string} expression - Mathematical expression in the form "a [] b"
 * @returns {number} Result of calculation
 */
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

/** Evaluates expression entered on the screen and displays result */
function equals() {
    if (screenLine2.textContent.length === 0) {
        return;
    } else if (screenLine1.textContent.length > 0) {
        // If number ends with a decimal point, append a 0 to the end
        if (screenLine1.textContent[screenLine1.textContent.length-1] === ".") {
            screenLine1.textContent += "0";
        }
        
        let result = calculate(screenLine1.textContent + " " + screenLine2.textContent);
        if (!isFinite(result) || isNaN(result)) {
            throw new Error("Attempted to divide by 0");
        } else {
            // Display result
            screenLine1.textContent = "";
            screenLine2.textContent = result;
            // Inform next method that number on the screen is a result
            showingResult = true;
        }
    }
}

/** 
 * Appends operator and pushes text to the top line of the screen
 * @param {string} symbol - Operator to be entered on the screen
 */
function addOperator(symbol) {
    if (screenLine2.textContent.length === 0) {
        return;
    } else if (screenLine1.textContent.length > 0) {
        // Another operator was previously entered on the screen
        // First perform that previous calculation, then apply current operator to the result
        try {
            equals();
        } catch (e) {
            // Division by zero attempted
            console.error(e);
            return;
        }
    }
    showingResult = false;
    screenLine1.textContent = `${screenLine2.textContent} ${symbol}`;
    screenLine2.textContent = "";
}

// Universal click event handler for all the buttons on the calculator
document.addEventListener(("click"), (e) => {
    if (e.target.classList.contains("number")) {
        // Number button was pressed
        appendToScreen(e.target.textContent);
    } else if (e.target.id === "period") {
        // Decimal point was pressed
        addPeriod();
    } else if (e.target.classList.contains("operator")) {
        // Operator button pressed
        addOperator(e.target.textContent);
    } else if (e.target.id === "equals") {
        // Equals button pressed
        try {
            equals();
        } catch (e) {
            // Division by zero attempted
            console.error(e);
        }
    } else if (e.target.id === "backspace") {
        // Backspace button was pressed
        backSpace();
    } else if (e.target.id === "clear-screen") {
        // CA button was pressed
        screenLine1.textContent = "";
        screenLine2.textContent = "";
    }
});

// Universal keyboard event handler 
// Allows user to interact with the calculator using their keyboard
document.addEventListener("keydown", (e) => {
    if ("0123456789".includes(e.key)) {
        // A number key was pressed
        appendToScreen(e.key);
    } else if (e.key === ".") {
        addPeriod();
    } else if ("+-*/x".includes(e.key)) {
        // An mathematical operator key was pressed
        addOperator(e.key);
    } else if (e.key === "=" || e.key === "Enter") {
        try {
            equals();
        } catch (e) {
            // Division by zero attempted
            console.error(e);
        }
    } else if (e.key === "Backspace" || e.key === "Delete") {
        // Backspace button
        backSpace();
    } else if (e.key === "Escape") {
        // CA button
        screenLine1.textContent = "";
        screenLine2.textContent = "";
    }
})
