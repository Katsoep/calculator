let numFirst;
let numSecond;
let operator;

function operate(a, operator, b){
    console.log(operator);
 switch(operator){
    case "+":
        console.log(a,b);
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