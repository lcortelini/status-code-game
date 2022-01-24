import { StatusAndCodes } from './statuscodes.js';

//separa os códigos das descrições
const statusCodes = [...Object.keys(StatusAndCodes)];
const statusDescriptions = [...Object.values(StatusAndCodes)];

const gameTitle = document.querySelector('.title');
const quizContainer = document.querySelector('.quiz-container');
const gameBtn = document.querySelector('.game-button');
const answersList = document.querySelector('.answer-list');
const answers = document.querySelectorAll('li');
const description = document.querySelector('.description');
const scorePoints = document.querySelector('.score-points');
let scoreH2 = document.querySelector('.score');
let finalScoreH2 = document.querySelector('.final-score');
const round = document.querySelector('.rounds');

const originalH2ScoreState = scoreH2.innerHTML;

const goodGreetings = [
  'Ótimo trabalho!',
  'Grande profissional!',
  'Fantástico!',
  'Siiim!',
  'Isso!',
];
const badGreetings = [
  'Mais sorte na próxima vez!',
  'Continue tentando!',
  'Você consegue na próxima vez!',
  'A melhor maneira de aprender é cometendo erros!',
  'Você vai chegar lá!',
];

let gameState = {
  selectedAnswerDescription: '',
  questions: [],
  rightQuestionIndex: 0,
  chosenAnswer: '',
  wrongAnswerLi: [],
  score: 0,
  round: 1,
};

let selectedAnswerState = {
  last: null,
  active: null,
};

let { active, last } = selectedAnswerState;

function startGame() {
  gameBtn.addEventListener('click', handleGameBtn);
}

function handleGameBtn() {
  if (gameBtn.innerText === 'Resultado') {
    displayResult();
  } else {
    gameBtn.innerText = 'Selecione';
    if (gameState.selectedAnswerDescription) {
      gameBtn.disabled = true;
      gameBtn.innerText = 'Próximo';
      compareAnswers();
    } else {
      gameBtn.disabled = true;
      startGameStatus();
    }
  }
}

function handleAnswerClick({ target }) {
  active = target;

  if (active.classList.contains('active')) {
    active.classList.remove('active');
    gameBtn.innerText = 'Selecione';
    disableBtn();
  } else {
    if (last) {
      last.classList.remove('active');
    }
    active.classList.add('active');
    gameState.selectedAnswerDescription = `${active.innerText}`;
    gameState.chosenAnswer = active;
    last = active;
    gameBtn.innerText = 'Confirmar';
    enableBtn();
  }
}

function disableBtn() {
  gameBtn.disabled = true;
}

function enableBtn() {
  gameBtn.disabled = false;
}

function compareAnswers() {
  gameBtn.disabled = false;
  if (
    gameState.rightQuestionIndex ===
    statusDescriptions.indexOf(gameState.selectedAnswerDescription)
  ) {
    gameState.chosenAnswer.classList.add('right');
    gameState.score++;
    gameState.selectedAnswerDescription = '';
  } else {
    gameState.chosenAnswer.classList.add('wrong');
    gameState.selectedAnswerDescription = '';
  }

  scorePoints.innerText = gameState.score;
  active = null;
  updateRound();
}

function addLiEvents() {
  answers.forEach((li) => {
    li.addEventListener('click', handleAnswerClick);
  });
}

function removeLiClass() {
  if (gameState.chosenAnswer && last) {
    last.classList.remove('active');
    gameState.chosenAnswer.classList.remove('right');
    gameState.chosenAnswer.classList.remove('wrong');
  }
}

function startGameStatus() {
  showScoreH2();
  hideFinalScoreH2();
  removeQuizContainerHidden();
  showAnswers();
  addLiEvents();
  pickRandomQuestions();
}

function restoreOriginalH2() {
  scoreH2.innerHTML = originalH2ScoreState;
}

function removeQuizContainerHidden() {
  quizContainer.removeAttribute('hidden');
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
  round.innerText = gameState.round;
  removeLiClass();
}

function updateRound() {
  if (gameState.round === 3) {
    gameBtn.innerText = 'Resultado';
  } else {
    gameState.round++;
  }
}

function displayResult() {
  gameTitle.style.visibility = '';
  gameBtn.innerText = 'Recomeçar!';
  hideAnswers();
  if (gameState.score >= 7) {
    description.innerText = `${
      goodGreetings[getRandomInt(0, goodGreetings.length)]
    }`;
  } else {
    description.innerText = `${
      badGreetings[getRandomInt(0, goodGreetings.length)]
    }`;
  }
  clearGameState();
}

function showAnswers() {
  answersList.removeAttribute('hidden');
}

function hideAnswers() {
  answersList.setAttribute('hidden', 'hidden');
  showFinalScore();
}

function showFinalScore() {
  scoreH2.setAttribute('hidden', 'hidden');
  finalScoreH2.removeAttribute('hidden');
  finalScoreH2.innerText = `Acertos: ${gameState.score}/10`;
}

function showScoreH2() {
  scoreH2.removeAttribute('hidden');
}

function hideFinalScoreH2() {
  finalScoreH2.setAttribute('hidden', 'hidden');
}

function clearGameState() {
  gameState.score = 0;
  gameState.round = 1;
  scorePoints.innerText = gameState.score;
  round.innerText = gameState.round;
}

//função para gerar inteiros aleatórios
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

startGame();
