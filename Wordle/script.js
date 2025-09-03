const gridEl = document.querySelector(".grid");

const words = [
  "apple",
  "grape",
  "pearl",
  "stone",
  "flame",
  "chair",
  "table",
  "plant",
  "light",
  "smile",
  "water",
  "bread",
  "storm",
  "green",
  "cloud",
  "sweet",
  "tiger",
  "zebra",
  "mouse",
  "house"
];

function getRandom(words){
    return words[Math.floor(Math.random() * words.length)]
}

let activeCell = null;
let input = "";
let currentRow = 0;
let answer = getRandom(words);

function createCells(row){
    gridEl.innerHTML = ""; //clear the board
    for(let i = 0; i < row; i++){ //create rows
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        rowDiv.id = `row-${i}`;
        for(let j = 0; j < 5; j++){ //create cells
            const cell = document.createElement("input");
            cell.id = `row-${i}-col-${j}`;
            cell.classList.add('cell');
            cell.maxLength = 1;

            cell.addEventListener("focus", () => {
                activeCell = cell;
                console.log(activeCell);
            });

            cell.addEventListener("input", () => {

                cell.value = cell.value.replace(/[^a-zA-Z]/g, "").toUpperCase(); //only allow letters;
                const nextCell = document.getElementById(`row-${i}-col-${j+1}`);
                if(nextCell && cell.value){
                    nextCell.focus();
                }
                
                
                console.log(answer);
            });

            cell.addEventListener("keydown", (e) => {
                if(e.key === 'Enter'){
                    if(canAnswer()) {
                        console.log('can answer');
                        for(let j = 0; j < 5; j++){
                            const cell = document.getElementById(`row-${currentRow}-col-${j}`);
                            input += cell.value;
                        }
                        checkAnswer(answer, input);
                        input = '';
                        currentRow++;
                        document.getElementById(`row-${currentRow}-col-0`)?.focus();
                        controlRow(currentRow);
                    } else {
                        console.log('cannot answer');
                    }

                    function canAnswer() {
                        for(let k = 0; k < 5; k++){
                            const cell = document.getElementById(`row-${i}-col-${k}`);
                            if(!cell.value) return false;
                        }
                        return true;
                    }
                }

                const prevCell = document.getElementById(`row-${i}-col-${j-1}`);
                if(prevCell && e.key === 'Backspace' && !cell.value){
                    prevCell?.focus();
                }
            })

            rowDiv.appendChild(cell);  
        }
        gridEl.appendChild(rowDiv);
    }
}

 function controlRow(currentRow) {
      for (let i = 0; i < 5; i++) {
        const row = document.getElementById(`row-${i}`);
        if (row) {
          const inputs = row.querySelectorAll("input");
          inputs.forEach((input) => input.setAttribute("readonly", true));          
        }
      }
      const activeRow = document.getElementById(`row-${currentRow}`);
      if (activeRow) {
        const inputs = activeRow.querySelectorAll("input");
        inputs.forEach((input) => input.removeAttribute("readonly"));
      }
    }

function checkAnswer(answer, input){
    const map = new Map();
    for (let i = 0; i < answer.length; i++) {
        let key = answer[i].toLowerCase();
        if(!map.has(key)){
            map.set(key, []);
        }
        map.get(key).push(i);
    }
    for(let i = 0; i < input.length; i++){
        let char = input[i].toLowerCase();   
        if(map.has(char)){
            let indexSet = new Set(map.get(char))
            console.log(indexSet);
            for(let item of indexSet){
                if(i === item){
                    console.log('change green at', i);
                    changeGreen(i)
                } else {
                    changeYellow(i)
                }
            }
        }
    }
    if(answer === input.toLowerCase()){
        console.log('you win');
    } else if(currentRow === 5 && answer !== input.toLowerCase()){
        console.log('you lose');
    }    
    map.clear()
}


function changeYellow(charIndex){
    const cell = document.getElementById(`row-${currentRow}-col-${charIndex}`);
    if(cell){
        cell.classList.add('contains');
    }
}

function changeGreen(charIndex){
    const cell = document.getElementById(`row-${currentRow}-col-${charIndex}`);
    if(cell){
        cell.classList.add('correct');
    }
}

createCells(6);
controlRow(currentRow)