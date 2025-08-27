const keys = document.querySelectorAll(".key");
const calScreen = document.getElementById("cal-screen");
const equal = document.getElementById("equal");
const operators = document.querySelectorAll(".operator");
const deleteKeys = document.querySelectorAll(".delete");

let isCalculated = false;
const operatorArr = ['+', '-', '*', '/']

function evaluateExpression(expr) {
  isCalculated = true;
  // 1️⃣ Split the expression into numbers (as numbers) and operators
  const numberStrings = expr.split(/[\+\-\*\/]/); // ["1", "2", "4", "4"]
  const numbers = []; // will hold actual numbers

  for (let i = 0; i < numberStrings.length; i++) {
    // Convert each string to a number and push to numbers array
    const num = Number(numberStrings[i]);
    numbers.push(num);
  }

  // 2️⃣ Extract operators into an array
  const operatorsMatch = expr.match(/[\+\-\*\/]/g);
  const operators = operatorsMatch ? operatorsMatch : []; // handle null if no operators

  // 3️⃣ Handle * and / first (operator precedence)
  let i = 0; // index for operators
  while (i < operators.length) {
    if (operators[i] === "*" || operators[i] === "/") {
      // Compute the result of numbers[i] <op> numbers[i+1]
      let result;
      if (operators[i] === "*") {
        result = numbers[i] * numbers[i + 1];
      } else { // "/"
        result = numbers[i] / numbers[i + 1];
      }

      // Replace the two numbers with the result
      numbers.splice(i, 2, result);

      // Remove the operator that we just used
      operators.splice(i, 1);

      // Do not increment i, because the next operator shifted into current index
    } else {
      // Move to the next operator if it is + or -
      i++;
    }
  }

  // 4️⃣ Handle + and - (remaining operators)
  let result = numbers[0]; // start with first number
  for (let j = 0; j < operators.length; j++) {
    if (operators[j] === "+") {
      result = result + numbers[j + 1];
    } else if (operators[j] === "-") {
      result = result - numbers[j + 1];
    }
  }

  // 5️⃣ Return the final result
  return result;
}

// Example


function trimZero(expression) {
  let numbers = expression.split(/[\+\-\*\/]/);
  let operators = expression.match(/[\+\-\*\/]/g) || [];
    for (let i = 0; i < numbers.length; i++) {
      console.log(numbers[i]);
      while (numbers[i].length > 1 && numbers[i][0] === '0') {
        numbers[i] = numbers[i].slice(1)
      }
    }
    
  let rejoin = numbers[0];
  for(let i = 0; i < operators.length; i++){
    rejoin += operators[i] + numbers[i+1]
  }
  return rejoin;
}


function renderScreen(prevVal, pressedKey) {
  console.log(isCalculated);
  

  calScreen.value = '';
  let nextVal = trimZero(prevVal + pressedKey);
  calScreen.value = nextVal
  
  
}
//console.log(renderScreen('40+5','3'));

keys.forEach((key) => {
  key.addEventListener("click", () => {
    let keyVal = key.innerText;
    if (keyVal === "C") {
      calScreen.value = "0";
    } else {
      renderScreen(calScreen.value, keyVal)
    }
  });
});

equal.addEventListener("click", () => {
  calScreen.value = evaluateExpression(calScreen.value);
});

deleteKeys.forEach((deleteKey) => {
  deleteKey.addEventListener("click", () => {
    calScreen.value = calScreen.value.slice(0, -1);
  });
});
