const noTaskDiv = document.querySelector('.no-task');
const createChallengeBtn = document.getElementById('create-challenge-btn');
const challengeContainer = document.querySelector('.challenge-container');
const editTaskDiv = document.querySelector('.edit-task');
const addBtn = document.querySelector('.add');
const challengesDiv = document.querySelector('.challenges');

createChallengeBtn.addEventListener('click', () => {
    noTaskDiv.classList.toggle('hidden');
    challengeContainer.classList.toggle('flex-start');
    editTaskDiv.classList.toggle('hidden');
});

if (addBtn) {
    addBtn.addEventListener('click', () => {
        //if (noTaskDiv) noTaskDiv.classList.add('hidden');
        editTaskDiv.classList.remove('hidden');
        challengeContainer.classList.add('flex-start');
        const challengeSummary = document.querySelector('.challenge-summary');
        if (challengeSummary) challengeSummary.classList.add('hidden');
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
        console.log('Cancel button clicked: action working');
        // Optionally, you can hide the edit-task or reset the form here
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
        challengesDiv.innerHTML = `
          <div class="challenge-summary">
            <h2>Upcoming Challenges</h2>
            <ul>
              ${challengeList.map(title => `<li><strong>${title}</strong></li>`).join('')}
            </ul>
          </div>
        `;
    });
}
