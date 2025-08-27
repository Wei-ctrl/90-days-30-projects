const keys = document.querySelectorAll(".key");
const calScreen = document.getElementById("cal-screen");
const equal = document.getElementById("equal");
const operators = document.querySelectorAll(".operator");
const deleteKeys = document.querySelectorAll(".delete");

function evaluateExpression(expr) {
  const numbers = expr.split(/[\+\-\*\/]/).map(Number);
  const operators = expr.match(/[\+\-\*\/]/g) || [];

  // First handle * and /
  for (let i = 0; i < operators.length; ) {
    if (operators[i] === "*" || operators[i] === "/") {
      const result =
        operators[i] === "*"
          ? numbers[i] * numbers[i + 1]
          : numbers[i] / numbers[i + 1];

      numbers.splice(i, 2, result); // replace two nums with result
      operators.splice(i, 1); // remove used operator
    } else {
      i++;
    }
  }

  // Then handle + and -
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += numbers[i + 1];
    } else if (operators[i] === "-") {
      result -= numbers[i + 1];
    }
  }

  return result;
}

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
