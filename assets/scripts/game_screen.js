/* jshint esversion:6 */
import {questions} from './questions.js';

/* module globals */
let score = 0;
let timeLeft = 0;
let questionIndex = 0;

function generateLayout(divEl, headerEl) {
  // the header
  const titleEl = headerEl.querySelector('h1');
  let titleFragment = document.createDocumentFragment();
  const titleText = document.createElement('span');
  titleText.id = 'game-title-text';
  titleText.textContent = 'Question: ';
  titleFragment.appendChild(titleText);
  const titleValue = document.createElement('span');
  titleValue.id = 'game-title-value';
  titleValue.textContent = questionIndex + 1;
  titleFragment.appendChild(titleValue);
  titleEl.textContent = '';
  titleEl.appendChild(titleFragment);
  // the body
  const headerFloatEl = headerEl.querySelector('#header-span');
  let headerSpanFragment = document.createDocumentFragment();
  const timerEl = document.createElement('div');
  const timerValue = document.createElement('span');
  timerValue.id = 'game-timer-value';
  timerValue.textContent = timeLeft;
  headerSpanFragment.appendChild(timerValue);
  const timerText = document.createElement('span');
  timerText.id = 'game-timer-text';
  timerText.textContent = "s left";
  headerSpanFragment.appendChild(timerText);
  headerFloatEl.textContent = '';
  headerFloatEl.appendChild(headerSpanFragment);

  const questionCardEl = document.createElement('div');
  questionCardEl.id = 'question-card';
  const questionTextEl = document.createElement('p');
  questionTextEl.id = 'question-text';
  const answerBlockEl = document.createElement('div');
  answerBlockEl.id = 'answer-block';
  questionCardEl.appendChild(questionTextEl);
  questionCardEl.appendChild(answerBlockEl);
  divEl.appendChild(questionCardEl);
  return [questionCardEl, timerValue];
}

function renderQuestion(questionCardEl, question) {
  const answerEl = document.querySelector('#answer-block');
  let answerFragment = document.createDocumentFragment();
  document.querySelector('#question-text').textContent = question.text;
  switch(question.type) {
    case "boolean":
      const trueBtnEl = document.createElement('button');
      trueBtnEl.classList.add('boolean-true');
      trueBtnEl.textContent = 'True';
      answerFragment.appendChild(trueBtnEl);

      const falseBtnEl = document.createElement('button');
      falseBtnEl.textContent = 'False';
      falseBtnEl.classList.add('boolean-false');
      answerFragment.appendChild(falseBtnEl);
    break;
  }
  answerEl.textContent = '';
  answerEl.appendChild(answerFragment);
}
function renderTimer(timerValueEl) {
  timerValueEl.textContent = timeLeft;
}

function getQuestion() {
  // TODO: question selection
  let question = null;
  console.log(`called ${questionIndex} times`);
  if(questionIndex > questions.length - 1) {
    question = questions[0];
  } else {
    question = questions[questionIndex];
  }
  questionIndex++;
  return question;
}
function gameScreen(divEl, headerEl) {
  timeLeft = 120;
  const [questionCardEl, timerBlockEl]  = generateLayout(divEl, headerEl);
  const answerBlockEl = questionCardEl.querySelector("#answer-block");
  let question = getQuestion();
  renderQuestion(questionCardEl, question);
  const timer = window.setInterval(() => {
    renderTimer(timerBlockEl);
    timeLeft--;
    if(timeLeft < 0) {
      divEl.dispatchEvent(new CustomEvent('gameOver', {detail: {score: score}}));
      window.clearInterval(timer);
    }
  }, 1000);
  answerBlockEl.addEventListener('click', (event) => {
    switch(question.type) {
      case 'boolean':
        const answerBool = event.target.classList.contains('boolean-true');
        if(answerBool === question.answer){
          divEl.dispatchEvent(new Event('rightAnswer'));
        } else {
          divEl.dispatchEvent(new Event('wrongAnswer'));
        }
      break;
    }
  });
  let rightAnswerListener = divEl.addEventListener('rightAnswer', () => {
    console.log('right!');
    score += 1;
    question = getQuestion();
    renderQuestion(questionCardEl, question);
  });
  let wrongAnswerListener = divEl.addEventListener('wrongAnswer', () => {
    console.log('wrong!');
    timeLeft -= 5;
    if(timeLeft < 0) timeLeft = 0;
  });
}

export {gameScreen};
