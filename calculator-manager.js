let numFirst = "";
let numSecond = "";
let operator = "";
let solution = 0;

/*Current errors to fix
    + NumSec needs to allow 0 as firs number (note: the calculations work even if not displayed)
*/

const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const displayScrn = document.querySelector(".display");
const clear = document.querySelector("#clear");
const clearAll = document.querySelector("#clearAll");
const equals = document.querySelector("#equals");
const decimalChar = document.querySelector("#decimal");
const zeroBtns = document.querySelectorAll(".zero");

/* Btn control---------------------------------------------------*/
digitBtns.forEach(digit => {
    digit.addEventListener("click", () =>{
        sortInput(digit.textContent);
    })
})

operatorBtns.forEach(opp => {
    opp.addEventListener("click", () =>{
        sortInput(opp.textContent);
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
    if(numFirst == "ERROR"){
        clearData();
    }
    if(operator == ""){
        numFirst = numFirst.substring(0,  numFirst.length -1);
        isActiveDecimal(numFirst);
    }
    if(numSecond == ""){
        operator = operator.substring(0,  operator.length -1);
    } else {
        numSecond = numSecond.substring(0,  numSecond.length -1);
          isActiveDecimal(numSecond);
    }
    updateDisplay();
})

decimalChar.addEventListener("click", () => {
    sortInput(decimalChar.textContent);
})


/*Keyboard support----------------------------------------------------*/
document.addEventListener("keydown", (e) => {
    const digits = ["0" ,"1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operators = ["+", "-", "*", "/"];
    const backspaceKey = "Backspace";
    const enterKey = "Enter";
    const decimalKey = ".";

    if(digits.includes(e.key)){
        sortInput(e.key);
    }

    if(operators.includes(e.key)){
        sortInput(e.key);
    }

    if(backspaceKey.includes(e.key)){
        if(numFirst == "ERROR"){
            clearData();
        }
        if(operator == ""){
            numFirst = numFirst.substring(0,  numFirst.length -1);
            isActiveDecimal(numFirst);
        }
        if(numSecond == ""){
            operator = operator.substring(0,  operator.length -1);
        } else {
            numSecond = numSecond.substring(0,  numSecond.length -1);
            isActiveDecimal(numSecond);
        }
        updateDisplay();
    }

    if(enterKey.includes(e.key)){
        e.preventDefault();
        numSecond == ""
        ? "" //flicker button red?
        : operate(numFirst, operator, numSecond);
    }

    if(decimalKey.includes(e.key)){
        sortInput(e.key);
    }
})


/*Data handling----------------------------------------------------*/
function updateDisplay(){
    let fullEquation = numFirst + operator + numSecond;
    displayScrn.textContent = maxString(fullEquation,14);
}
function clearData (){
    numFirst = "";
    operator = "";
    numSecond = "";
    isActiveDecimal(numFirst);
    isActiveDecimal(numSecond);
}

function roundToOneDecimal (num){
    const sign = num < 0 ? -1 : 1;
    return sign * Math.round((Math.abs(num) + Number.EPSILON) * 10) / 10;
}   

function isActiveDecimal(string){
   if (string.includes(".")){
    decimalChar.disabled = true;
   } else {
    decimalChar.disabled = false;
   }
}

function maxString(str, maxLength){
    if(str.length > maxLength){
        return str.substring(0, maxLength);
    }
    return str;
}

function maxDecimal (str, input){
    let newStr = str.substring(0, str.length - 1);
    if(newStr.includes(".")){
        if(newStr.charAt(newStr.length - 1) == ".") {
            return newStr.substring(0, newStr.length) + input;
        } else {
            return newStr.substring(0, newStr.length - 1) + input;
        }
    }
    else {
        return str;
    }
}

function sortInput(input){
    if(["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(input)){
    //   console.log(input);
        if(solution && operator == "") {
            clearData();
            solution = 0;
        }
       
        operator == "" 
            ? numFirst +=  input
            : numSecond += input;

        operator == "" 
            ? numFirst = maxDecimal(numFirst, input)
            : numSecond = maxDecimal(numSecond, input);
    }

    else if(numFirst !== "" && ["00", "0"].includes(input)){
     //   console.log(input);
        operator == "" 
            ? numFirst += input 
            : numSecond += input;
    }

    else if(["+", "-", "*", "/"].includes(input)){
     //   console.log(input);
        decimalChar.disabled = false;
        if (numSecond == ""){
            if( numFirst == "ERROR" || numFirst == ""){
                operator = "";
            } else {
                operator = input;
            }
        } else {
            operate(numFirst, operator, numSecond);
            if( numFirst == "ERROR"){
                operator = "";
            } else {
                operator = input;
            }
        }
    }

    else if (input == "."){
        if(operator == ""){
            if(numFirst.includes(".") == false){
                numFirst += input; 
            } 
            isActiveDecimal(numFirst);
        } else {
            if(numSecond.includes(".") == false){
              numSecond += input;
            } 
            isActiveDecimal(numSecond);
        }
    }
    updateDisplay();
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
    numFirst = "" + result;
    updateDisplay();
    solution = 1;
    return maxString(result, 17);
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

