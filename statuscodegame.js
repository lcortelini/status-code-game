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
  rightQuestion: '',
  rightQuestionIndex: 0,
  chosenAnswer: '',
  wrongAnswerLi: [],
  score: 0,
  round: 1,
  blockSelection: false,
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
  gameState.blockSelection = false;
  if (gameBtn.innerText === 'Resultado') {
    displayResult();
  } else {
    gameBtn.innerText = 'Selecione';
    if (gameState.selectedAnswerDescription) {
      gameBtn.disabled = true;
      gameBtn.innerText = 'Próximo';
      gameState.blockSelection = true;
      compareAnswers();
    } else {
      gameBtn.disabled = true;
      startGameStatus();
    }
  }
}

function addLiEvents() {
  answers.forEach((li) => {
    li.addEventListener('click', handleAnswerClick);
  });
}

function handleAnswerClick({ target }) {
  if (gameState.blockSelection === false) {
    active = target;

    if (active.classList.contains('active')) {
      active.classList.remove('active');
      gameBtn.innerText = 'Selecione';
      gameState.blockSelection = false;
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
      gameState.blockSelection === true;
      enableBtn();
    }
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
    hightlightRightQuestion();
  }

  scorePoints.innerText = gameState.score;
  active = null;
  updateRound();
}

function removeLiClass() {
  if (gameState.chosenAnswer && last) {
    last.classList.remove('active');
    gameState.chosenAnswer.classList.remove('right');
    gameState.chosenAnswer.classList.remove('wrong');
    removeHighlightFromRightQuestion();
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

function removeQuizContainerHidden() {
  quizContainer.removeAttribute('hidden');
}

function getQuestion() {
  return statusDescriptions[getRandomInt(0, statusDescriptions.length)];
}

function pickRandomQuestions() {
  let questions = [];

  //inserir questions na array e filtrar repetidas
  for (let i = 0; i <= 3; i++) {
    let newQuestion = getQuestion();

    if (questions.includes(newQuestion)) {
      i--;
      newQuestion = getQuestion();
    } else {
      questions.push(newQuestion);
    }
  }

  //popular as questões aleatórias nas li's
  answers.forEach((li, index) => {
    li.innerText = questions[index];
  });

  //escolher uma questão para ser a certa
  gameState.rightQuestion = questions[getRandomInt(0, 4)];

  //obter a casa da array com a resposta certa
  let rightQuestionIndex = statusDescriptions.indexOf(gameState.rightQuestion);

  description.innerText = `Status do código ${statusCodes[rightQuestionIndex]}`;
  description.style.fontSize = '1.6rem';
  gameTitle.style.visibility = 'hidden';

  gameState.rightQuestionIndex = rightQuestionIndex;
  round.innerText = gameState.round;
  removeLiClass();
}

function hightlightRightQuestion() {
  answers.forEach((answer) => {
    if (answer.innerText === gameState.rightQuestion) {
      answer.classList.add('right');
    }
  });
}

function removeHighlightFromRightQuestion() {
  answers.forEach((answer) => {
    answer.classList.remove('right');
  });
}

function updateRound() {
  if (gameState.round === 10) {
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
