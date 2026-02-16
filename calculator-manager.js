let numFirst = "";
let numSecond = "";
let operator = "";
let solution = 0;

/*Current errors to fix
    + limit user to one decimal
    + Add backspace, "C" only deletes the last input
*/

/* Btn & display----------------------------------------------------*/
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const displayScrn = document.querySelector(".display");
const clear = document.querySelector("#clear");
const clearAll = document.querySelector("#clearAll");
const equals = document.querySelector("#equals");
const decimalChar = document.querySelector("#decimal");

digitBtns.forEach(digit => {
    digit.addEventListener("click", () =>{
        if(solution && operator == "") {
            clearData();
            solution = 0;
        }
        operator == "" 
        ? numFirst += digit.textContent 
        : numSecond += digit.textContent;
        updateDisplay();
    })
})

operatorBtns.forEach(opp => {
    opp.addEventListener("click", () =>{
        decimalChar.disabled = false;
        if (numSecond == ""){
            if( numFirst == "ERROR" || numFirst == ""){
                operator = "";
            } else {
                operator = opp.textContent;
            }
        } else {
            operate(numFirst, operator, numSecond);
            //solution = 0;
            if (numFirst == "ERROR"){
                operator = "";
            } else {
                operator = opp.textContent;
            }
        }
        updateDisplay();
    })
})

equals.addEventListener("click", () => {
    numSecond == ""
    ? "" //flicker button red?
    : operate(numFirst, operator, numSecond);
    updateDisplay();
})

clearAll.addEventListener("click", () => {
    clearData();
    updateDisplay();
})

clear.addEventListener("click", () =>{
    //delete last index string in current step
})

decimalChar.addEventListener("click", () => {
    decimal.disabled = true;
})

function updateDisplay(){
    displayScrn.textContent = numFirst + operator + numSecond;
}
function clearData (){
    numFirst = "";
    operator = "";
    numSecond = "";
}
/*functionality----------------------------------------------------*/
function operate(a, operator, b){
    let result = "";
    switch(operator){
        case "+":
            result = roundToOneDecimal(addNum(+a, +b));
            break;

        case "-":
            result = roundToOneDecimal(substractNum(+a, +b));
            break;

        case "*":
            result = roundToOneDecimal(multiplyNum(+a, +b));
            break;

        case "/":
            if (b === "0"){
                result = "ERROR";
            } else {
                result = roundToOneDecimal(divideNum(+a, +b));
            }
            break;

        }
    clearData();
    numFirst = result;
    updateDisplay();
    solution = 1;
    decimalChar.disabled = false;
    return result
}

function addNum(a, b){
    return a + b;
}

function substractNum(a, b){
    return a - b;
}

function multiplyNum(a, b){
    return a * b;
}

function divideNum(a, b){
    if(b === 0){
        return "ERROR";
    } else {
    return a / b;
    }
}

function roundToOneDecimal (num){
    const sign = num < 0 ? -1 : 1;
    return sign * Math.round((Math.abs(num) + Number.EPSILON) * 100) / 100;
}   