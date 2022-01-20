import { StatusAndCodes } from './statuscodes.js';

//separa os códigos das descrições
const statusCodes = [...Object.keys(StatusAndCodes)];
const statusDescriptions = [...Object.values(StatusAndCodes)];

const gameTitle = document.querySelector('.title');
const quizContainer = document.querySelector('.quiz-container');
const gameBtn = document.querySelector('.game-button');
const answers = document.querySelectorAll('li');
const description = document.querySelector('.description');

function startGame() {
  gameBtn.addEventListener('click', handleGameBtn);
}

function addLiEvents() {
  answers.forEach((li) => {
    li.addEventListener('click', handleAnswerClick);
  });
}

let newTarget = null;
let last = null;

function handleAnswerClick({ target }) {
  let active = target;

  if (newTarget) {
    last.classList.remove('active');
    last = null;
    newTarget = false;
  } else if (active === target) {
    active.classList.add('active');
    last = active;
    active = null;
    newTarget = true;
  }
}

function handleGameBtn() {
  startGameStatus();
}

function startGameStatus() {
  removeQuizContainerHidden();
  addLiEvents();
  pickRandomQuestions();
}

function removeQuizContainerHidden() {
  quizContainer.removeAttribute('hidden');
}

//função para gerar inteiros aleatórios
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function pickRandomQuestions() {
  const getQuestion = () => {
    return statusDescriptions[getRandomInt(0, statusDescriptions.length)];
  };

  let questions = [getQuestion(), getQuestion(), getQuestion(), getQuestion()];

  //popular as questões aleatórias nas li's
  answers.forEach((li, index) => {
    li.innerText = questions[index];
  });

  //escolher uma questão para ser a certa
  let rightQuestion = questions[getRandomInt(0, 4)];

  //obter a casa da array com a resposta certa
  let rightQuestionIndex = statusDescriptions.indexOf(rightQuestion);

  description.innerText = `Status do código ${statusCodes[rightQuestionIndex]}`;
  description.style.fontSize = '1.6rem';
  gameTitle.style.visibility = 'hidden';

  return rightQuestionIndex;
}

// console.log(Object.values(StatusAndCodes)[0]); // Pega cada posição da array

// console.log((answerList.children[2].innerText = `${statusDescriptions[2]}`));

startGame();
