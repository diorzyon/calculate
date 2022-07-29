let displayValue = '0';
let firstnumber = null;
let secondnumber = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e}']`);
    key.click();
});
function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
} 
updateDisplay();
function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('number')) {
                inputnumber(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplay();
        }
    )}
}

clickButton();

function inputnumber(number) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            
            displayValue = number;
        } else if(displayValue === firstnumber) {
            
            displayValue = number;
        } else {
            displayValue += number;
        }
    } else {
        
        if(displayValue === firstnumber) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        
        secondOperator = operator;
        secondnumber = displayValue;
        result = operate(Number(firstnumber), Number(secondnumber), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstnumber = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        
        secondnumber = displayValue;
        result = operate(Number(firstnumber), Number(secondnumber), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstnumber = displayValue;
        result = null;
    } else { 
        
        firstOperator = operator;
        firstnumber = displayValue;
    }
}

function inputEquals() {
    
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        
        secondnumber = displayValue;
        result = operate(Number(firstnumber), Number(secondnumber), secondOperator);
        if(result === '') {
            displayValue = '';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstnumber = displayValue;
            secondnumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        
        secondnumber = displayValue;
        result = operate(Number(firstnumber), Number(secondnumber), firstOperator);
        if(result === '') {
            displayValue = '';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstnumber = displayValue;
            secondnumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if(displayValue === firstnumber || displayValue === secondnumber) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    firstnumber = null;
    secondnumber = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if(firstnumber != null) {
        firstnumber = null;
        updateDisplay();
    }
}

function operate(x, y, op) {
    if(op === '+') {
        return x + y;
    } else if(op === '-') {
        return x - y;
    } else if(op === '*') {
        return x * y;
    } else if(op === '/') {
        if(y === 0) {
            return '';
        } else {
        return x / y;
        }
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}