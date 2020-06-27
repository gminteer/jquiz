/* jshint esversion:6 */
import {questions} from './questions.js';

function generateLayout(divEl) {
  const questionCardEl = document.createElement('div');
  questionCardEl.id = 'question-card';
  const questionTextEl = document.createElement('p');
  questionTextEl.id = 'question-text';
  const answerBlockEl = document.createElement('div');
  answerBlockEl.id = 'answer-block';
  questionCardEl.appendChild(questionTextEl);
  questionCardEl.appendChild(answerBlockEl);
  divEl.appendChild(questionCardEl);
  return questionCardEl;
}

function renderQuestion(questionCardEl, question) {
  const answerEl = document.querySelector('#answer-block');
  const answerFragment = document.createDocumentFragment();
  document.querySelector('#question-text').textContent = question.q;
  switch(question.type) {
    case "boolean":
      const trueBtnEl = document.createElement('button');
      trueBtnEl.textContent = 'True';
      const falseBtnEl = document.createElement('button');
      falseBtnEl.textContent = 'False';
      if(question.answer) {
        trueBtnEl.classList.add('right');
        falseBtnEl.classList.add('wrong');
      } else {
        trueBtnEl.classList.add('wrong');
        falseBtnEl.classList.add('right');
      }
      answerFragment.appendChild(trueBtnEl);
      answerFragment.appendChild(falseBtnEl);
    break;
  }
  answerEl.textContent = ''; // blank the div
  answerEl.appendChild(answerFragment);
}

function gameScreen(divEl) {
  const questionCardEl = generateLayout(divEl);
  const answerBlockEl = questionCardEl.querySelector("#answer-block");
  renderQuestion(questionCardEl, questions[0]);
  answerBlockEl.addEventListener('click', (event) => {
    console.log(event.target);
  });
}

export {gameScreen};
