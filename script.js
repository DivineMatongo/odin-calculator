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

function backSpace() {
    if (screenLine2.textContent.length > 0) {
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
        case "*":
            return a * b;
        case "/":
        case "÷":
            return a / b;
    }
}

function equals() {
    if (screenLine1.textContent.length > 0) {
        if (screenLine1.textContent[screenLine1.textContent.length-1] === ".") {
            screenLine1.textContent += "0";
        }
        let result = calculate(screenLine1.textContent + " " + screenLine2.textContent);
        screenLine1.textContent = "";
        screenLine2.textContent = result;
    }
}

/*  FUNCTION operator(symbol) {
        IF line1 is not empty THEN
            equals()
        ELSE
            Move number entered from line2 to line1
        Append appropriate symbol to line1 with space
        Clear line2
    } */

/*  Universal Event Handler("click", {
        IF button pressed is [1-9] THEN
            appendToScreen([1-9])
        ELSE IF button pressed is . THEN
            addPeriod()
        ELSE IF button pressed is [operator] THEN
            operator(symbol)
        ELSE IF button pressed is equals THEN
            equals()
        ELSE IF button pressed is [backspace] THEN
            backspace()
        ELSE IF button pressed is [CA] THEN
            clear line1 and line2
    }) */