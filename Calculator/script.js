const keys = document.querySelectorAll(".key");
const calScreen = document.getElementById("cal-screen");
const equal = document.getElementById("equal");
const operators = document.querySelectorAll(".operator");
const deleteKeys = document.querySelectorAll(".delete");

let isCalculated = false;
const operatorArr = ["+", "-", "*", "/"];

/*
function evaluateExpression(expr) {
  // Tokenize the expression
  let tokens = expr.match(/sin|cos|tan|sqrt|log|pi|e|\d+(\.\d+)?%?|\+|\-|\*|\/|\^|\(|\)/g);

  function parseTokens(tokens) {
    let stack = [];
    for (let i = 0; i < tokens.length; i++) {
      let t = tokens[i];

      // constants
      if (t === "pi") stack.push(Math.PI);
      else if (t === "e") stack.push(Math.E);

      // numbers & percentages
      else if (/^\d+(\.\d+)?%?$/.test(t)) {
        if (t.endsWith("%")) {
          let percentValue = parseFloat(t) / 100;

          // Look at previous operator to decide how to apply %
          let prevOperator = (stack.length > 1 && typeof stack[stack.length - 2] === "string") 
                             ? stack[stack.length - 2] 
                             : null;

          if (prevOperator === "+" || prevOperator === "-") {
            // percentage of previous number (left-hand side of + or -)
            let base = stack[stack.length - 3] !== undefined ? stack[stack.length - 3] : 0;
            stack.push(base * percentValue);
          } else {
            // standalone or *,/ → normal percentage
            if (stack.length > 0 && typeof stack[stack.length - 1] === "number") {
              let prev = stack.pop();
              stack.push(prev * percentValue);
            } else {
              stack.push(percentValue);
            }
          }
        } else {
          stack.push(parseFloat(t));
        }
      }

      // functions (sin, cos, etc.)
      else if (["sin", "cos", "tan", "sqrt", "log"].includes(t)) {
        if (tokens[i + 1] === "(") {
          // find matching )
          let depth = 1;
          let j = i + 2;
          while (j < tokens.length && depth > 0) {
            if (tokens[j] === "(") depth++;
            else if (tokens[j] === ")") depth--;
            j++;
          }
          let inside = parseTokens(tokens.slice(i + 2, j - 1));
          stack.push(applyFunction(t, inside));
          i = j - 1; // jump ahead
        }
      }

      // operators & parentheses → keep
      else {
        stack.push(t);
      }
    }

    return evalSimple(stack);
  }

  // Evaluate with operator precedence
  function evalSimple(tokens) {
    // Handle ^ first
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "^") {
        let val = Math.pow(tokens[i - 1], tokens[i + 1]);
        tokens.splice(i - 1, 3, val);
        i--;
      }
    }
    // Handle * and /
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "*" || tokens[i] === "/") {
        let val = tokens[i] === "*" ? tokens[i - 1] * tokens[i + 1] : tokens[i - 1] / tokens[i + 1];
        tokens.splice(i - 1, 3, val);
        i--;
      }
    }
    // Handle + and -
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
      if (tokens[i] === "+") result += tokens[i + 1];
      else if (tokens[i] === "-") result -= tokens[i + 1];
    }
    return result;
  }

  return parseTokens(tokens);
}

// Function implementations
function applyFunction(func, value) {
  if (func === "sin") return Math.sin(value * Math.PI / 180);
  if (func === "cos") return Math.cos(value * Math.PI / 180);
  if (func === "tan") return Math.tan(value * Math.PI / 180);
  if (func === "sqrt") return Math.sqrt(value);
  if (func === "log") return Math.log10(value);
}
*/

function evaluateExpressionByMe(expression) {
  let tokens = expression.match(/sin|\d+(\.\d+)?\%?|\+|\-|\*|\//g);

  let stack = [];
  for (let i = 0; i < tokens.length; i++) {
    let t = tokens[i];
    if (/^\d+(\.\d+)?$/.test(t)) {
      stack.push(parseFloat(t));
    } else {
      stack.push(t);
    }
  }

  console.log(tokens);
  console.log(stack);

  function evalSimple(stack) {
    if (stack.length === 1) {
      return stack[0];
    }
    for (let i = 0; i < stack.length; i++) {
      if (stack[i] === "*" || stack[i] === "/") {
        let val =
          stack[i] === "*"
            ? stack[i - 1] * stack[i + 1]
            : stack[i - 1] / stack[i + 1];
        stack.splice(i - 1, 3, val);
        i--;
      }
    }
    console.log(stack);
    
    for (let i = 0; i < stack.length; i++) {
      if (stack[i] === "+" || stack[i] === "-") {
        let val =
          stack[i] === "+"
            ? stack[i - 1] + stack[i + 1]
            : stack[i - 1] - stack[i + 1];
        stack.splice(i - 1, 3, val);
        i--;
      }
    }
    console.log(stack);

    return evalSimple(stack);
  }

  return evalSimple(stack);
}
console.log(evaluateExpressionByMe("30*5-18/3*3+130")); 

// Example
function trimZero(expression) {
  let numbers = expression.split(/[\+\-\*\/]/);
  let operators = expression.match(/[\+\-\*\/]/g) || [];
  for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
    while (numbers[i].length > 1 && numbers[i][0] === "0") {
      numbers[i] = numbers[i].slice(1);
    }
  }

  let rejoin = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    rejoin += operators[i] + numbers[i + 1];
  }
  return rejoin;
}

function renderScreen(prevVal, pressedKey) {
  console.log(isCalculated);

  if (isCalculated && !operatorArr.includes(pressedKey)) {
    calScreen.value = "";
    calScreen.value = pressedKey;
    isCalculated = false;
  } else {
    isCalculated = false;
    calScreen.value = "";
    let nextVal = trimZero(prevVal + pressedKey);
    calScreen.value = nextVal;
    console.log(calScreen.value);
  }
}
//console.log(renderScreen('40+5','3'));

keys.forEach((key) => {
  key.addEventListener("click", () => {
    let keyVal = key.innerText;

    if (keyVal === "C") {
      calScreen.value = "0";
    } else {
      renderScreen(calScreen.value, keyVal);
    }
  });
});

equal.addEventListener("click", () => {
  calScreen.value = evaluateExpressionByMe(calScreen.value);
});

deleteKeys.forEach((deleteKey) => {
  deleteKey.addEventListener("click", () => {
    calScreen.value = calScreen.value.slice(0, -1);
  });
});
