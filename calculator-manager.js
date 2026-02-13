let numFirst = "";
let numSecond = "";
let operator= "";

/*Current errors to fix
    + When a result is displayed, pressing a new digit should clear the result
    + Display a snarky error message if the user tries to divide by 0 + it should not crash
    + You should round answers with long decimals 
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
        operate(numFirst, operator, numSecond);
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
            
            result = addNum(+a, +b);
            break;

        case "-":
            result = substractNum(+a, +b);
            break;

        case "*":
            result = multiplyNum(+a, +b);
            break;

        case "/":
            result = divideNum(+a, +b);
            break;
        }
    clearData();
    numFirst = result;
    updateDisplay();
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
    return a / b;
}