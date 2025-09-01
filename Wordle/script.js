const gridEl = document.querySelector(".grid");

let activeCell = null;
let answer = "";
let currentRow = 0;

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
                    //check Answer
                    //console.log('checking answer');
                    //check can be answered
                    if(canAnswer()) {
                        console.log('can answer');
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
                    //activeCell.value = ''
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

createCells(6);
controlRow(currentRow)