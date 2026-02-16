let numFirst = "";
let numSecond = "";
let operator = "";
let solution = 0;

/*Current errors to fix
    + operator cant show numFirst is empty or error message is shown
    + rounded decimal breaks error msg
*/

/* Btn & display----------------------------------------------------*/
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const displayScrn = document.querySelector(".display");
const clear = document.querySelector("#clear");
const clearAll = document.querySelector("#clearAll");
const equals = document.querySelector("#equals");

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
    if (numSecond == ""){
        operator = opp.textContent;

    } else {
    // if (numFirst =! "") {
        operate(numFirst, operator, numSecond);
        solution = 0;
        operator = opp.textContent;
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
            result = roundToOneDecimal(divideNum(+a, +b));
            break;

        }
    clearData();
    numFirst = result;
    updateDisplay();
    solution = 1;
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