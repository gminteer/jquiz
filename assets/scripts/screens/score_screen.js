/* jshint esversion:6 */
var quizData;
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

function generateHeader(headerEl, text, textClass) {
  let titleEl = document.createElement('h1');
  titleEl.classList.add(textClass);
  titleEl.textContent = text;
  headerEl.textContent = '';
  headerEl.appendChild(titleEl);
}
function generateResultBlock(labels) {
  let resultsEl = document.createElement('div');
  resultsEl.classList.add('results');
  for(const key of Object.keys(labels)) {
    let rowEl = document.createElement('div');
    rowEl.classList.add('result-row');
    let rowLabel = document.createElement('h3');
    rowLabel.textContent = labels[key];
    rowEl.appendChild(rowLabel);
    let rowValue = document.createElement('span');
    rowValue.id = key;
    rowEl.appendChild(rowValue);
    resultsEl.appendChild(rowEl);
  }
  return resultsEl;
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

function generateResults() {
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
  let resultBlockEl = generateResultBlock(labels);
  resultsEl.appendChild(resultBlockEl);
  renderResults(resultsEl, event);
  return resultsEl;
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
  let formSubmitBtn = document.createElement('input');
  formSubmitBtn.type = 'submit';
  formEl.appendChild(formLabelEl);
  formEl.appendChild(formInputInitials);
  formEl.appendChild(formSubmitBtn);
  return formEl;
}
function generateHighScoreList() {
  let tableEl = document.createElement('table');
  tableEl.id = 'high-score-table';
  for(let i = 0; i < quizData.highScores.length; i++) {
    let rowEl = document.createElement('tr');
    let rowData = [{place: i + 1},{initials: quizData.highScores[i].initials}, {score: quizData.highScores[i].score}];
    for(const cellData of rowData) {
      let cellEl = document.createElement('td');
      cellEl.classList.add(Object.keys(cellData)[0]);
      cellEl.textContent = Object.values(cellData)[0];
      rowEl.appendChild(cellEl);
    }
    tableEl.appendChild(rowEl);
  }
  return tableEl;
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
  if(event.detail) {
    let resultsEl = generateResults();
    fragment.appendChild(resultsEl);
    let formEl = generateInputForm();
    let inputEl = formEl.querySelector('#initials-input');
    inputEl.dataset.score = event.detail.score;
    formEl.addEventListener('submit', submitListener);
    formEl.addEventListener('runTitle', runTitleListener);
    fragment.appendChild(formEl);
  }
  if(quizData.highScores) {
    let highScoreDiv = document.createElement('div');
    highScoreDiv.id = 'high-score-container';
    if(event.detail) { // insert a subheader if the main header is 'Game Over'
      let highScoreLabel = document.createElement('h2');
      highScoreLabel.classList.add('high-score-label');
      highScoreLabel.textContent = 'High Scores';
      highScoreDiv.appendChild(highScoreLabel);
    }
    let highScoreTable = generateHighScoreList();
    highScoreDiv.appendChild(highScoreTable);
    fragment.appendChild(highScoreDiv);
  }
  let backBtn = document.createElement('button');
  backBtn.id = 'score-back-button';
  backBtn.textContent = 'Back to Main Menu';
  backBtn.addEventListener('click', clickListener);
  fragment.appendChild(backBtn);
  mainEl.textContent = '';
  mainEl.appendChild(fragment);
}

function scoreScreen(mainEl, headerEl, event) {
  quizData = localStorage.getItem('quizData');
  if(quizData) {
    quizData = JSON.parse(quizData);
  } else {
    quizData = {};
  }
  if(event.detail) {
    generateHeader(headerEl, 'Game Over', 'game-over-label');
  } else {
    generateHeader(headerEl, 'High Scores', 'high-score-label');
  }
  generateMain(mainEl, event);
}

export {scoreScreen};
