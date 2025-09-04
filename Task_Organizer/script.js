const noTaskDiv = document.querySelector('.no-task');
const createChallengeBtn = document.getElementById('create-challenge-btn');
const challengeContainer = document.querySelector('.challenge-container');

createChallengeBtn.addEventListener('click', () => {
    noTaskDiv.classList.toggle('hidden');
    challengeContainer.classList.toggle('flex-start');
})
