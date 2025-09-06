const noTaskDiv = document.querySelector('.no-task');
const createChallengeBtn = document.getElementById('create-challenge-btn');
const challengeContainer = document.querySelector('.challenge-container');
const editTaskDiv = document.querySelector('.edit-task');
const addBtn = document.querySelector('.add');
const challengesDiv = document.querySelector('.challenges');

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
        challengeList.push(name);
        localStorage.setItem('challengeList', JSON.stringify(challengeList));
        // Hide edit-task and show summary
        const editTaskDiv = document.querySelector('.edit-task');
        if (editTaskDiv) {
            editTaskDiv.classList.add('hidden');
        }
        challengeContainer.classList.remove('flex-start');
        challengesDiv.classList.remove('hidden');
        //challengesDiv.innerHTML = `
        //  <div class="challenge-summary">
        //    <h2>Upcoming Challenges</h2>
        //    <ul>
        //      ${challengeList.map(title => `<li><strong>${title}</strong></li>`).join('')}
        //    </ul>
        //  </div>
        //`;
    });
}

function init(){
    if (challengeList.length > 0) {
        noTaskDiv.classList.add('hidden');

        editTaskDiv.classList.add('hidden');
        challengeContainer.classList.remove('flex-start');

        challengesDiv.classList.remove('hidden');
    } else {
        noTaskDiv.classList.remove('hidden');

        editTaskDiv.classList.add('hidden');
        challengeContainer.classList.add('flex-start');

        challengesDiv.classList.add('hidden');
    }
}

init()
