/* jshint esversion:6 */
import {questionData} from './question_data.js';

const questions = {
  _index: 0,
  _randomIndexes: [],
  count: 0,
  target: undefined,
  reset() {
    this.count = 0;
    this._index = 0;
    this._randomIndexes = Object.keys(questionData);
    this._randomIndexes.sort(() => 0.5 - Math.random());
  },
  get currentQuestion() {
    return questionData[this._index];
  },
  get length() {
    return Object.keys(questionData).length;
  },
  render() {
    if(!this.target) throw new ReferenceError('missing render target');
    let question = this.currentQuestion;
    let answerEl = this.target.querySelector('#answer-block');
    let answerFragment = document.createDocumentFragment();
    let pointValue = '';
    if(question.pointValue) {
      pointValue = `(${question.pointValue} pts) `;
    }
    document.querySelector('#question-text').textContent = pointValue + question.text;
    switch(question.type) {
      case 'boolean':
        let trueBtn = document.createElement('button');
        trueBtn.classList.add('boolean-true');
        trueBtn.textContent = 'True';
        trueBtn.type = 'submit';
        answerFragment.appendChild(trueBtn);
        const falseBtn = document.createElement('button');
        falseBtn.classList.add('boolean-false');
        falseBtn.textContent = 'False';
        falseBtn.type = 'submit';
        answerFragment.appendChild(falseBtn);
      break;
      case 'multipleChoice':
        let randomChoiceOrder = Object.keys(question.answers);
        randomChoiceOrder.sort(() => 0.5 - Math.random());
        for(const key of randomChoiceOrder) {
          let answerBtn = document.createElement('button');
          answerBtn.classList.add('multipleChoice');
          answerBtn.dataset.id = key;
          answerBtn.textContent = question.answers[key].text;
          answerBtn.type = 'submit';
          answerFragment.appendChild(answerBtn);
        }
      break;
      case 'textInput':
        let inputEl = document.createElement('input');
        inputEl.type = 'text';
        inputEl.id = 'text-input';
        answerFragment.appendChild(inputEl);
        let submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Submit';
        answerFragment.appendChild(submitBtn);
      break;
    }
    answerEl.textContent = '';
    answerEl.appendChild(answerFragment);
  },
  nextQuestion() {
    if(this._randomIndexes.length > 0) {
      this.count++;
      this._index = this._randomIndexes.pop();
      return true;
    }
    this.target.dispatchEvent(new Event('outOfQuestions', {bubbles: true}));
    return false;
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
        if(input == '') return;
        if(question.answer == input) {
          let event = new Event('rightAnswer', {bubbles: true});
          this.dispatchEvent(rightAnswerEvent);
        } else {
          this.dispatchEvent(wrongAnswerEvent);
        }
      break;
    }
  },
};

export {questions};
