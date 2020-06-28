/* jshint esversion:6 */

import {questions} from '../game/questions.js';

/* module globals */
const timer = {
  _counter: 0,
  _gameOver: false,
  reset() {
    this._counter = 120;
    this._gameOver = false;
  },
  tick(amount = 1) {
    this._counter -= amount;
    if(this._counter <= 0) {
      this._counter = 0;
      if(!this._gameOver) { // quick hack to stop multiple game overs by button mashing
        eventTarget.dispatchEvent(new CustomEvent('gameOver', {detail: {score: score}}));
        this._gameOver = true;
      }
      return false;
    }
    return true;
  },
  get timeLeft() {
    return timer._counter;
  }
};

const header = {
  renderTarget: undefined,
  render() {
    if(typeof this.renderTarget == 'undefined') throw new ReferenceError('missing render target');
    let renderTarget = this.renderTarget;
    renderTarget.querySelector('#game-question-counter > .value').textContent = questions.count;
    renderTarget.querySelector('#game-score > .value').textContent = score;
    renderTarget.querySelector('#game-timer > .value').textContent = timer.timeLeft;
  }
};

let score = 0;
var eventTarget;
var answerTarget;
var timerInterval;

function generateHeader(headerType, label) {
  let headerEl = document.createElement('div');
  headerEl.id = headerType;
  let headerLabelEl = document.createElement('span');
  headerLabelEl.classList.add('label');
  headerLabelEl.textContent = label;
  headerEl.appendChild(headerLabelEl);
  let headerValueEl = document.createElement('span');
  headerValueEl.classList.add('value');
  headerEl.appendChild(headerValueEl);
  return headerEl;
}
function generateLayout(mainEl, headerEl) {
  let headerFragment = document.createDocumentFragment();
  headerFragment.appendChild(generateHeader('game-question-counter', 'Question:'));
  headerFragment.appendChild(generateHeader('game-score', 'Score:'));
  headerFragment.appendChild(generateHeader('game-timer', 'Time remaining:'));
  headerEl.textContent = '';
  headerEl.appendChild(headerFragment);
  let questionEl = document.createElement('div');
  questionEl.id = 'question-block';
  let questionTextEl = document.createElement('p');
  questionTextEl.id = 'question-text';
  let answerBlockEl = document.createElement('form');
  answerBlockEl.id = 'answer-block';
  questionEl.appendChild(questionTextEl);
  questionEl.appendChild(answerBlockEl);
  mainEl.textContent = '';
  mainEl.appendChild(questionEl);
  return [questionEl, answerBlockEl];
}

function rightAnswerListener() {
  if(questions.currentQuestion.pointValue) {
    score += questions.currentQuestion.pointValue;
  } else {
    score++;
  }
  if(questions.nextQuestion()) {
    questions.render();
    header.render();
  }
}
function wrongAnswerListener() {
  if(timer.tick(5)) header.render();
}
function outOfQuestionsListener() {
  eventTarget.dispatchEvent(new CustomEvent('gameOver', {
    detail: {
      score: score,
      timeLeft: timer.timeLeft
    }
  }));
}
function gameOverListener() { // clean up callbacks we don't need anymore
  eventTarget.removeEventListener('rightAnswer', rightAnswerListener);
  eventTarget.removeEventListener('wrongAnswer', wrongAnswerListener);
  eventTarget.removeEventListener('outOfQuestions', outOfQuestionsListener);
  eventTarget.removeEventListener('gameOver', gameOverListener);
  answerTarget.removeEventListener('submit', questions.handleAnswer);
  window.clearInterval(timerInterval);
}

function gameScreen(mainEl, headerEl) {
  // reset module globals
  timer.reset();
  questions.reset();
  score = 0;
  // set up HTML, display a question
  let [questionEl, answerBlockEl] = generateLayout(mainEl, headerEl);
  questions.target = questionEl;
  questions.nextQuestion();
  questions.render();
  header.renderTarget = headerEl;
  header.render();
  // start countdown timer
  timerInterval = window.setInterval(() => {if(timer.tick()) header.render();}, 1000);
  // pass elements up to module global for event handling
  eventTarget = mainEl;
  answerTarget = answerBlockEl;
  eventTarget.addEventListener('rightAnswer', rightAnswerListener);
  eventTarget.addEventListener('wrongAnswer', wrongAnswerListener);
  eventTarget.addEventListener('outOfQuestions', outOfQuestionsListener);
  eventTarget.addEventListener('gameOver', gameOverListener);
  answerTarget.addEventListener('submit', questions.handleAnswer);
}

export {gameScreen};
