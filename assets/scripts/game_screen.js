/* jshint esversion:6 */
import {questionData} from './question_data.js';

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
const questions = {
  _index: 0,
  count: 0,
  renderTarget: undefined,
  reset() {
    this.count = 0;
    this._index = 0;
  },
  get currentQuestion() {
    return questionData[this._index];
  },
  render() {
    if(!this.renderTarget) throw new ReferenceError('missing render target');
    let question = this.currentQuestion;
    let answerEl = this.renderTarget.querySelector('#answer-block');
    let answerFragment = document.createDocumentFragment();
    document.querySelector('#question-text').textContent = question.text;
    switch(question.type) {
      case 'boolean':
        let trueBtnEl = document.createElement('button');
        trueBtnEl.classList.add('boolean-true');
        trueBtnEl.textContent = 'True';
        trueBtnEl.type = 'submit';
        answerFragment.appendChild(trueBtnEl);
        const falseBtnEl = document.createElement('button');
        falseBtnEl.classList.add('boolean-false');
        falseBtnEl.textContent = 'False';
        falseBtnEl.type = 'submit';
        answerFragment.appendChild(falseBtnEl);
      break;
      case 'multipleChoice':
        for(const key of Object.keys(question.answers)) {
          let answerBtnEl = document.createElement('button');
          answerBtnEl.classList.add('multipleChoice');
          answerBtnEl.dataset.id = key;
          answerBtnEl.textContent = question.answers[key].text;
          answerBtnEl.type = 'submit';
          answerFragment.appendChild(answerBtnEl);
        }
      break;
      case 'textInput':
        let inputEl = document.createElement('input');
        inputEl.type = 'text';
        inputEl.id = 'text-input';
        answerFragment.appendChild(inputEl);
        let submitBtnEl = document.createElement('input');
        submitBtnEl.type = 'submit';
        answerFragment.appendChild(submitBtnEl);
      break;
    }
    answerEl.textContent = '';
    answerEl.appendChild(answerFragment);
  },
  nextQuestion() {
    this.count++;
    this._index = (this.count - 1) % questionData.length;
  },
  handleAnswer(event) {
    event.preventDefault();
    let question = questions.currentQuestion; // 'this' isn't the questions object here
    switch(question.type) {
      case 'boolean':
        const answerBool = event.submitter.classList.contains('boolean-true');
        if(answerBool == question.answer) {
          eventTarget.dispatchEvent(new Event('rightAnswer'));
        } else {
          eventTarget.dispatchEvent(new Event('wrongAnswer'));
        }
      break;
      case 'multipleChoice':
        let answerId = event.submitter.dataset.id;
        if(question.answers[answerId].isRight) {
          eventTarget.dispatchEvent(new Event('rightAnswer'));
        } else {
          eventTarget.dispatchEvent(new Event('wrongAnswer'));
        }
      break;
      case 'textInput':
        let input = event.target.querySelector('#text-input').value.trim().toLowerCase();
        console.log(input);
        if(question.answer == input) {
          eventTarget.dispatchEvent(new Event('rightAnswer'));
        } else {
          eventTarget.dispatchEvent(new Event('wrongAnswer'));
        }
      break;
    }
  },
};
let header = {
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
  questions.nextQuestion();
  questions.render();
  header.render();
}
function wrongAnswerListener() {
  if(timer.tick(5)) header.render();
}
function gameOverListener() {
  eventTarget.removeEventListener('rightAnswer', rightAnswerListener);
  eventTarget.removeEventListener('wrongAnswer', wrongAnswerListener);
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
  questions.renderTarget = questionEl;
  questions.nextQuestion();
  questions.render();
  header.renderTarget = headerEl;
  header.render();
  // start countdown timer
  timerInterval = window.setInterval(() => { if(timer.tick()) header.render(); }, 1000);
  // pass elements up to module global for event handling
  eventTarget = mainEl;
  answerTarget = answerBlockEl;
  eventTarget.addEventListener('rightAnswer', rightAnswerListener);
  eventTarget.addEventListener('wrongAnswer', wrongAnswerListener);
  eventTarget.addEventListener('gameOver', gameOverListener);
  answerTarget.addEventListener('submit', questions.handleAnswer);
}

export {gameScreen};
