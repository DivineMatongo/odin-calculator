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

/*  FUNCTION calculate(expression -> "a * b") {
        split string at spaces
        Combine operands with required operation and return result
    } */

//  FUNCTION backSpace() {}

/*  FUNCTION equals() 
        IF line1 is empty THEN exit
        IF line1 ends with . THEN add 0
        Grab number and symbol on line1 and combine it with number on line2
        Show result on line2
        Clear line1
    } */

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