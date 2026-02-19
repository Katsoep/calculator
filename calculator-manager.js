let numFirst = "";
let numSecond = "";
let operator = "";
let solution = 0;

/*Current errors to fix
    + limit user to one decimal
    + zero shouldnt be added if no other number has been entered
    + keyboard controls
    + max 17 characters
    + if error msg C = clearAll
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

zeroBtns.forEach(zero => {
    zero.addEventListener("click", () =>{
        if(solution && operator == "") {
            clearData();
            solution = 0;
        }

        if(numFirst == ""){
            numFirst = ""
        } else {
        operator == "" 
        ? numFirst += zero.textContent 
        : numSecond += zero.textContent;
        }
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
         operator == "" 
        ? isActiveDecimal(numFirst)
        : isActiveDecimal(numSecond);
})


/*Data handling----------------------------------------------------*/
function updateDisplay(){
    displayScrn.textContent = numFirst + operator + numSecond;
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
    return sign * Math.round((Math.abs(num) + Number.EPSILON) * 100) / 100;
}   

function isFirstNumber (){
    return operator == "" ? 1 : -1
}

function isActiveDecimal(string){
   if (string.includes(".")){
    decimalChar.disabled = true;
   } else {
    decimalChar.disabled = false;
   }
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