let numFirst = "";
let numSecond = "";
let operator= "";

const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const displayScrn = document.querySelector(".display");
const clear = document.querySelector("#clear");
const clearAll = document.querySelector("#clearAll");

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
        numSecond == ""
        ? operator = opp.textContent 
        : operator //Give result + result = num1 + operator = pressed btn;
        updateDisplay();
    })
})

clearAll.addEventListener("click", () =>{
    numFirst = "";
    operator = "";
    numSecond = "";
    updateDisplay();
})

clear.addEventListener("click", () =>{
    //delete last index string in current step
})

function brain(){

    if(numFirst){
        //current step = 2
        if(operator){
            //current step = 3
            if (numSecond){
                //operate can happen
            }
        }
    } else {
        //current step = 1
    }
}

function updateDisplay(){
    displayScrn.textContent = numFirst + operator + numSecond;
}

//function that updates my var nums above
//when button press add pressed number to string
//if operator pass string to numfirst + set operator to pressed button
//if current operator == pressed nothing happens if current operator =! pressed => update current to pressed
//if last button operator && pressed button is digit, this digit is numsecond
//if = button is pressed, operate(numfirst, operator, numsecond)
//result = numfirst

function operate(a, operator, b){
 switch(operator){
    case "+":
        return addNum(a, b);
        break;

    case "-":
        return substractNum(a, b);
        break;

    case "*":
        return multiplyNum(a, b);
        break;

    case "/":
        return divideNum(a, b);
        break;
 }
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