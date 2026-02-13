let numFirst = "";
let numSecond = "";
let operator= "";

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

//function that updates my var nums above
//when button press add pressed number to string
//if operator pass string to numfirst + set operator to pressed button
//if current operator == pressed nothing happens if current operator =! pressed => update current to pressed
//if last button operator && pressed button is digit, this digit is numsecond
//if = button is pressed, operate(numfirst, operator, numsecond)
//result = numfirst

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

//Basic math functions
function addNum(a, b){
    return a + b;
}
//const addNum1 = (a, b) => a + b;

function substractNum(a, b){
    return a - b;
}

function multiplyNum(a, b){
    return a * b;
}

function divideNum(a, b){
    return a / b;
}