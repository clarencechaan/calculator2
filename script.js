let displayValue = '0';
let operator = null;
let firstNum = '';
let secondNum = '';
const display = document.querySelector('#displayValue')

function add(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b){
    if (operator === 'add') {
        return add(a, b);
    } else if (operator === 'subtract') {
        return subtract(a, b);
    } else if (operator === 'multiply') {
        return multiply(a, b);
    } else if (operator === 'divide') {
        return divide(a, b);
    }
}

function clearDisplay() {
    displayValue = '0';
    display.innerText = '0';
}

function storeOperator(selectedOperator) {
    firstNum = displayValue;
    displayValue = '0'
    operator = selectedOperator;
    console.log(operator);
}

// input number or decimal, build onto displayValue
function buildDisplayValue(number) {
    if (displayValue.length >= 9) {
        return;
    } else if ((displayValue.includes('.') || displayValue.includes('e')) 
            && number === '.') {
        return;
    } else if (displayValue === '0') {
        displayValue = number.toString();
    } else {
        displayValue = (displayValue + number).toString();
    }
    display.innerText = displayValue;
    console.log(displayValue);
}

function negateDisplayValue() {
    displayValue = (-displayValue).toString();
    display.innerText = displayValue;
}

// applies operation to first and second number, then outputs result to display
function calculateToDisplay() {
    if (!operator) {
        return;
    }
    let result = operate(operator, firstNum, displayValue);
    display.innerText = fitToCalculator(result);
    displayValue = fitToCalculator(result).toString();
    operator = null;
}

// converts numbers to fit on the calculator if it doesn't already
function fitToCalculator(num) {
    if (num <= 999999999 && num >= -9999999999) {
        return +num.toFixed(3);
    } else {
        return num.toExponential(3);
    }
};

function executePercent() {
    let result = displayValue / 100;
    display.innerText = fitToCalculator(result);
    displayValue = fitToCalculator(result).toString();
    operator = null;


// add event listeners to number and decimal buttons
const numButtons = document.querySelectorAll('.number-button');
numButtons.forEach(
    (button) => {
        button.addEventListener('click', () => buildDisplayValue(button.innerText));
    });

// add event listener to clear button
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearDisplay)

// add event listeners to operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(
    (button) => {
        button.addEventListener('click', () => storeOperator(button.id));
    }
)

// add event listener to equals button
const equalButton = document.querySelector('#equals');
equalButton.addEventListener('click', calculateToDisplay);

// add event listener to +/- button
const posNegButton = document.querySelector('#pos-neg');
posNegButton.addEventListener('click', negateDisplayValue);

// add event listener to percent button
const percentButton = document.querySelector('#percent');
percentButton.addEventListener('click', executePercent);