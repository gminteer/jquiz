/* jshint esversion:6 */
import {questions} from './questions.js';

/* module globals */
let score = 0;
let timer = 120;
let questionIndex = 0;

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
function gameScreen(divEl) {
  const questionCardEl = generateLayout(divEl);
  const answerBlockEl = questionCardEl.querySelector("#answer-block");
  let question = getQuestion();
  renderQuestion(questionCardEl, question);
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
    question = getQuestion();
    renderQuestion(questionCardEl, question);
  });
  let wrongAnswerListener = divEl.addEventListener('wrongAnswer', () => {
    console.log('wrong!');
  });
}

export {gameScreen};
