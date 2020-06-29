/* jshint esversion:6 */
var quizData;

function runTitleListener() {
  this.removeEventListener('runTitle', runTitleListener);
  localStorage.setItem('quizData', JSON.stringify(quizData));
}
function clickListener() {
  this.removeEventListener('click', clickListener);
  if(event.target.dataset.score) quizData.lastRun = {score: event.target.dataset.score, initials: 'Anonymous'};
  this.dispatchEvent(new Event('runTitle', {bubbles: true}));
}
function submitListener(event) {
  event.preventDefault();
  this.removeEventListener('submit', submitListener);
  let inputEl = event.target.querySelector('#score-initials-input');
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
  quizData.lastRun = {score: score, initials: initials};
  this.dispatchEvent(new Event('runTitle', {bubbles: true}));
}

function inputListener(event) {
  let input = event.target.value;
  if(input.length > 3) {
    input = input.slice(0, -1);
    event.target.value = input;
  }
}
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
    timeLeftEl.textContent = `${detail.timeLeft} seconds`;
  } else {
    timeLeftEl.textContent = '(out of time)';
  }
}

function generateResults() {
  let resultsEl = document.createElement('div');
  resultsEl.id = 'results-container';
  let resultsLabel = document.createElement('h2');
  resultsLabel.textContent = 'Your results';
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
  let formTitleEl = document.createElement('h3');
  formTitleEl.id = 'score-new-highscore';
  formTitleEl.textContent = 'New high score!';
  formEl.appendChild(formTitleEl);
  let formInputInitials = document.createElement('input');
  formInputInitials.id = 'score-initials-input';
  formInputInitials.type = 'text';
  formEl.addEventListener('input', inputListener);
  let formLabelEl = document.createElement('label');
  formLabelEl.for = 'score-initials-input';
  formLabelEl.textContent = "Enter your initials:";
  let formSubmitBtn = document.createElement('button');
  formSubmitBtn.type = 'submit';
  formSubmitBtn.textContent = 'Submit';
  formEl.appendChild(formLabelEl);
  formEl.appendChild(formInputInitials);
  formEl.appendChild(formSubmitBtn);
  return formEl;
}
function generateHighScoreList() {
  let tableEl = document.createElement('table');
  tableEl.id = 'score-highscore-table';
  let headerEl = document.createElement('thead');
  let headerRowEl = document.createElement('tr');
  let headers = [{rank: 'Rank'}, {initials: 'Initials'}, {score: 'Score'}];
  for(const header of headers) {
    let headerEl = document.createElement('th');
    headerEl.classList.add(Object.keys(header)[0]);
    headerEl.textContent = Object.values(header)[0];
    headerRowEl.appendChild(headerEl);
  }
  headerEl.appendChild(headerRowEl);
  tableEl.appendChild(headerEl);
  for(let i = 0; i < quizData.highScores.length; i++) {
    let rowEl = document.createElement('tr');
    let rowData = [{rank: i + 1},{initials: quizData.highScores[i].initials}, {score: quizData.highScores[i].score}];
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
function generateMain(mainEl, event) {
  let fragment = document.createDocumentFragment();
  if(event.detail) {
    let resultsEl = generateResults();
    resultsEl.classList.add('card');
    if(quizData.highScores && event.detail.score > Number(quizData.highScores[quizData.highScores.length - 1].score)) {
      let formEl = generateInputForm();
      let inputEl = formEl.querySelector('#score-initials-input');
      inputEl.dataset.score = event.detail.score;
      formEl.addEventListener('submit', submitListener);
      resultsEl.appendChild(formEl);
    } else {
      let labelEl = document.createElement('h3');
      labelEl.id = 'score-no-highscore';
      labelEl.textContent = 'Better luck next time!';
      resultsEl.appendChild(labelEl);
    }
    fragment.appendChild(resultsEl);
  }
  if(quizData.highScores) {
    let highScoreDiv = document.createElement('div');
    highScoreDiv.id = 'score-highscore-container';
    highScoreDiv.classList.add('card');
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
  generateMain(mainEl, event);
  if(event.detail) {
    generateHeader(headerEl, 'Game Over', 'score-game-over-label');
    let backBtn = mainEl.querySelector('#score-back-button');
    backBtn.dataset.score = event.detail.score;
  } else {
    generateHeader(headerEl, 'High Scores', 'score-high-score-label');
  }
  document.body.addEventListener('runTitle', runTitleListener);
  mainEl.id = 'score-main';
  headerEl.id = 'score-header';
}

export {scoreScreen};
