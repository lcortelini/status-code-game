import { StatusAndCodes } from './statuscodes.js';

//separa os códigos das descrições
const statusCodes = [...Object.keys(StatusAndCodes)];
const statusDescriptions = [...Object.values(StatusAndCodes)];

const gameTitle = document.querySelector('.title');
const quizContainer = document.querySelector('.quiz-container');
const gameBtn = document.querySelector('.game-button');
const answers = document.querySelectorAll('li');
const description = document.querySelector('.description');
const scorePoints = document.querySelector('.score-points');

let gameState = {
  selectedAnswer: '',
  questions: [],
  rightQuestionIndex: 0,
  righQuestionLi: '',
  wrongAnswerLi: [],
  score: 0,
};

function startGame() {
  gameBtn.addEventListener('click', handleGameBtn);
}

function handleGameBtn() {
  gameBtn.innerText = 'Confirmar';
  if (gameState.selectedAnswer) {
    gameBtn.disabled = true;
    compareAnswers();
  } else {
    gameBtn.disabled = true;
    startGameStatus();
  }
}

function compareAnswers() {
  gameBtn.innerText = 'Próximo';
  gameBtn.disabled = false;
  if (
    gameState.rightQuestionIndex ===
    statusDescriptions.indexOf(gameState.selectedAnswer)
  ) {
    gameState.righQuestionLi.classList.add('right');
    gameState.score++;
    gameState.selectedAnswer = '';
  } else {
    gameState.righQuestionLi.classList.add('wrong');
    gameState.selectedAnswer = '';
  }

  scorePoints.innerText = gameState.score;
  active = null;
}

function addLiEvents() {
  answers.forEach((li) => {
    li.addEventListener('click', handleAnswerClick);
  });
}

let newTarget = null;
let last = null;
let active = null;

function handleAnswerClick({ target }) {
  active = target;

  if (newTarget) {
    last.classList.remove('active');
    gameState.selectedAnswer = '';
    last = null;
    newTarget = false;
    gameBtn.disabled = true;
  } else if (active === target) {
    active.classList.add('active');
    gameState.selectedAnswer = `${active.innerText}`;
    gameState.righQuestionLi = active;
    last = active;
    active = null;
    newTarget = true;
    gameBtn.disabled = false;
  }
}

function removeLiClass() {
  if (gameState.righQuestionLi && last) {
    last.classList.remove('active');
    gameState.righQuestionLi.classList.remove('right');
    gameState.righQuestionLi.classList.remove('wrong');
  }
}

function startGameStatus() {
  removeLiClass();
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
  gameState.questions = questions;

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

  gameState.rightQuestionIndex = rightQuestionIndex;
}

startGame();
