/* jshint esversion:6 */
let quizData = localStorage.getItem('quizData');
if(quizData) {
  quizData = JSON.parse(quizData);
} else {
  quizData = {};
}
const runTitleEvent = (lastRunInitials, lastRunScore) => new CustomEvent(
  'runTitle',
  {
    bubbles: true,
    detail: {
    lastRunInitials: lastRunInitials,
    lastRunScore: lastRunScore
    }
  }
);

function generateHeader(headerEl) {
  let titleEl = document.createElement('h1');
  titleEl.id = 'game-over';
  headerEl.textContent = '';
  headerEl.appendChild(titleEl);
}
function generateTable(labels, tableType) {
  let tableEl = document.createElement('table');
  tableEl.classList.add(tableType);
  for(const key of Object.keys(labels)) {
    let tableRow = document.createElement('tr');
    let rowLabel = document.createElement('h3');
    rowLabel.textContent = labels[key];
    tableRow.appendChild(rowLabel);
    let rowValue = document.createElement('span');
    rowValue.id = key;
    tableRow.appendChild(rowValue);
    tableEl.appendChild(tableRow);
  }
  return tableEl;
}
function generateInputForm() {
  let formEl = document.createElement('form');
  formEl.id = 'score-input';
  let formInputInitials = document.createElement('input');
  formInputInitials.id = 'initials-input';
  formInputInitials.type = 'text';
  formInputInitials.pattern = '[A-za-z0-9 .?!]{3}';
  let formLabelEl = document.createElement('label');
  formLabelEl.for = 'initials-input';
  formLabelEl.textContent = "Enter your initials:";
  let formSubmitBtnEl = document.createElement('input');
  formSubmitBtnEl.type = 'submit';
  formEl.appendChild(formLabelEl);
  formEl.appendChild(formInputInitials);
  formEl.appendChild(formSubmitBtnEl);
  return formEl;
}
function renderResults(resultsEl, event) {
  let scoreEl = resultsEl.querySelector('#result-score');
  let countEl = resultsEl.querySelector('#result-count');
  let timeLeftEl = resultsEl.querySelector('#result-time-left');
  let detail = event.detail;
  scoreEl.textContent = `${detail.score} points`;
  countEl.textContent = `${detail.count} (of ${detail.length})`;
  if(Number(detail.timeLeft) > 0) {
    timeLeftEl.textContent = `Finished with ${detail.timeLeft} seconds left`;
  } else {
    timeLeftEl.textContent = '(out of time)';
  }
}
function runTitleListener() {
  this.removeEventListener('runTitle', runTitleListener);
  localStorage.setItem('quizData', JSON.stringify(quizData));
}
function clickListener() {
  this.removeEventListener('click', clickListener);
  this.dispatchEvent(new Event('runTitle', {bubbles: true}));
}
function submitListener(event) {
  event.preventDefault();
  this.removeEventListener('submit', submitListener);
  let inputEl = event.target.querySelector('#initials-input');
  let score = Number(inputEl.dataset.score);
  let initials = inputEl.value;
  if(quizData.highScores) {
    let highScores = quizData.highScores;
    if((highScores.length < 10) || (score > Number(highScores[highScores.length - 1].score))) {
      highScores.push({score: score, initials: initials});
      highScores.sort((a, b) => Number(b.score) - Number(a.score));
      if(highScores.length > 10) {
        highScores.pop();
      }
    }
  } else {
    quizData.highScores = [{score: score, initials: initials}];
  }
  this.dispatchEvent(runTitleEvent(initials, score));
}
function generateMain(mainEl, event) {
  let fragment = document.createDocumentFragment();
  let quizData = {};
  if(event) {
    let resultsEl = document.createElement('div');
    resultsEl.id = 'results';
    let resultsLabel = document.createElement('h2');
    resultsLabel.textContent = 'Your results:';
    resultsEl.appendChild(resultsLabel);
    let labels = {
      'result-score': 'Score:',
      'result-count': 'Questions Answered:',
      'result-time-left': 'Time Remaining:'
    };
    let tableEl = generateTable(labels, 'results');
    resultsEl.appendChild(tableEl);
    renderResults(resultsEl, event);
    fragment.appendChild(resultsEl);
    let formEl = generateInputForm();
    let inputEl = formEl.querySelector('#initials-input');
    inputEl.dataset.score = event.detail.score;
    formEl.addEventListener('submit', submitListener);
    formEl.addEventListener('runTitle', runTitleListener);
    fragment.appendChild(formEl);
  }
  if(quizData.highScoresEl) {
    let highScoresEl = document.createElement('section');
    highScoresEl.id = 'high-scores';
  }
  let backBtnEl = document.createElement('button');
  backBtnEl.id = 'score-back-button';
  backBtnEl.textContent = 'Back to Main Menu';
  backBtnEl.addEventListener('click', clickListener);
  fragment.appendChild(backBtnEl);
  mainEl.textContent = '';
  mainEl.appendChild(fragment);
}

function scoreScreen(mainEl, headerEl, event=undefined) {
  generateHeader(headerEl);
  generateMain(mainEl, event);
}

export {scoreScreen};
