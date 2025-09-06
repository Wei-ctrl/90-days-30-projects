const noTaskDiv = document.querySelector('.no-task');
const createChallengeBtn = document.getElementById('create-challenge-btn');
const challengeContainer = document.querySelector('.challenge-container');
const editTaskDiv = document.querySelector('.edit-task');
const addBtn = document.querySelector('.add');
const challengesDiv = document.querySelector('.challenges');
const challengeListDiv = document.querySelector('.challenge-list');

createChallengeBtn.addEventListener('click', () => {
    noTaskDiv.classList.add('hidden');

        editTaskDiv.classList.remove('hidden');
        challengeContainer.classList.add('flex-start');

        challengesDiv.classList.add('hidden');
});

if (addBtn) {
    addBtn.addEventListener('click', () => {
        noTaskDiv.classList.add('hidden');

        editTaskDiv.classList.remove('hidden');
        challengeContainer.classList.add('flex-start');

        challengesDiv.classList.add('hidden');
    });
}

// Make cancel and save buttons clickable
const cancelBtn = document.querySelector('.cancel-button');
const saveBtn = document.querySelector('.save-button');

let challengeList = [];

// Load challenges from localStorage on page load
const savedChallenges = JSON.parse(localStorage.getItem('challengeList') || '[]');
if (savedChallenges.length > 0) {
    challengeList = savedChallenges;
    noTaskDiv.classList.add('hidden');
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        //need to clear inputs
        init()
    });
}

if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        // Collect form data
        const name = document.getElementById('name')?.value || '';
        const description = document.getElementById('description')?.value || '';
        const group = document.getElementById('group')?.value || '';
        const startDate = document.getElementById('start-date')?.value || '';
        const frequency = document.getElementById('frequency')?.value || '';
        const duration = document.getElementById('duration')?.value || '';
        const data = {
            name,
            description,
            group,
            startDate,
            frequency,
            duration
        };
        console.log('Saved challenge:', data);
        challengeList.push(data);
        localStorage.setItem('challengeList', JSON.stringify(challengeList));
        // Hide edit-task and show summary
       
       init()
    });
}

function init(){
    if (challengeList.length > 0) {
        noTaskDiv.classList.add('hidden');

        editTaskDiv.classList.add('hidden');
        challengeContainer.classList.remove('center');
        challengeContainer.classList.add('flex-start');

        challengesDiv.classList.remove('hidden');

        renderChallenges()
    } else {
        noTaskDiv.classList.remove('hidden');

        editTaskDiv.classList.add('hidden');
        challengeContainer.classList.add('center');
        challengeContainer.classList.remove('flex-start');

        challengesDiv.classList.add('hidden');
    }
}

function renderChallenges() {
            challengeContainer.classList.remove('center');
            challengeContainer.classList.add('flex-start');
            challengeContainer.classList.add('list-format')
            challengeListDiv.innerHTML = ''
            /*
            <div class="challenge-item">
            <div class="task-logo">
              <i class="fa-solid fa-hourglass-start"></i>
            </div>
            <div class="task-text">
              <div class="challenge-name">
                Here is the really long challange name
              </div>
              <div class="challenge-sub">
                <span class="day">Day 1</span>
                <span class="freq">Daily</span>
              </div>
            </div>
          </div>
          */
        for(let i = challengeList.length - 1; i >= 0; i--){
            console.log(challengeList[i]);
            const challengeItemDiv = document.createElement('div');
            challengeItemDiv.classList.add('challenge-item')
        challengeItemDiv.innerHTML = `
            <div class="task-logo">
              <i class="fa-solid fa-hourglass-start"></i>
            </div>
            <div class="task-text">
              <div class="challenge-name">
                ${challengeList[i].name}
              </div>
              <div class="challenge-sub">
                <span class="day">${challengeList[i].group}</span>
                <span class="freq">${challengeList[i].frequency}</span>
              </div>
            </div>
        `
        challengeListDiv.appendChild(challengeItemDiv)
        }
        
        
        //localStorage.setItem('challengeList', JSON.stringify(challengeList));

        
}

init()
//renderChallenges()
