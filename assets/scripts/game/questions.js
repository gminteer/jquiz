/* jshint esversion:6 */
import {questionData} from './question_data.js';

const questions = {
  _index: 0,
  _randomIndexes: [],
  count: 0,
  renderTarget: undefined,
  reset() {
    this.count = 0;
    this._index = 0;
    this._randomIndexes = Object.keys(questionData);
    this._randomIndexes.sort(() => 0.5 - Math.random());
  },
  get currentQuestion() {
    return questionData[this._index];
  },
  render() {
    if(!this.renderTarget) throw new ReferenceError('missing render target');
    let question = this.currentQuestion;
    let answerEl = this.renderTarget.querySelector('#answer-block');
    let answerFragment = document.createDocumentFragment();
    let pointValue = '';
    if(question.pointValue) {
      pointValue = `(${question.pointValue} pts) `;
    }
    document.querySelector('#question-text').textContent = pointValue + question.text;
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
        let randomChoiceOrder = Object.keys(question.answers);
        randomChoiceOrder.sort(() => 0.5 - Math.random());
        for(const key of randomChoiceOrder) {
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
    if(this._randomIndexes.length > 0) {
      this._index = this._randomIndexes.pop();
    } else {
      this.renderTarget.dispatchEvent(new Event('outOfQuestions', {bubbles: true}));
    }
  },
  handleAnswer(event) {
    let rightAnswerEvent = new Event('rightAnswer', {bubbles: true});
    let wrongAnswerEvent = new Event('wrongAnswer', {bubbles: true});
    event.preventDefault();
    let question = questions.currentQuestion; // 'this' isn't the questions object when events happen
    switch(question.type) {
      case 'boolean':
        const answerBool = event.submitter.classList.contains('boolean-true');
        if(answerBool == question.answer) {
          this.dispatchEvent(rightAnswerEvent);
        } else {
          this.dispatchEvent(wrongAnswerEvent);
        }
      break;
      case 'multipleChoice':
        let answerId = event.submitter.dataset.id;
        if(question.answers[answerId].isRight) {
          this.dispatchEvent(rightAnswerEvent);
        } else {
          this.dispatchEvent(wrongAnswerEvent);
        }
      break;
      case 'textInput':
        let input = event.target.querySelector('#text-input').value.trim().toLowerCase();
        if(question.answer == input) {
          let event = new Event('rightAnswer');
          this.dispatchEvent(rightAnswerEvent);
        } else {
          this.dispatchEvent(wrongAnswerEvent);
        }
      break;
    }
  },
};

export {questions};
