import { StatusAndCodes } from './statuscodes.js';

//separa os códigos das descrições
let statusCodes = [...Object.keys(StatusAndCodes)];
const statusDescriptions = [...Object.values(StatusAndCodes)];

const quizContainer = document.querySelector('.quiz-container');
const gameBtn = document.querySelector('.game-button');
const answerList = document.querySelector('.answer-list');

function startGame() {
  gameBtn.addEventListener('click', handleGameBtn);
}

function handleGameBtn() {
  quizContainer.removeAttribute('hidden');
}

// console.log(Object.values(StatusAndCodes)[0]); // Pega cada posição da array

// console.log((answerList.children[2].innerText = `${statusDescriptions[2]}`));

startGame();
