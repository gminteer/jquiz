/* jshint esversion:6 */
var quizData;

function startClickListener() {
  this.removeEventListener('click', startClickListener);
  this.dispatchEvent(new Event('startGame', {bubbles: true}));
}
function scoreClickListener() {
  this.removeEventListener('click', scoreClickListener);
  this.dispatchEvent(new Event('gameOver', {bubbles: true}));
}

function generateLastRun() {
  let lastRunDiv = document.createElement('div');
  lastRunDiv.id = 'title-last-run';
  lastRunDiv.classList.add('card');
  let lastRunTitleEl = document.createElement('h2');
  lastRunTitleEl.textContent = 'Last Attempt';
  lastRunDiv.appendChild(lastRunTitleEl);
  let lastRunDataEl = document.createElement('p');
  lastRunDataEl.textContent = `${quizData.lastRun.score} points by ${quizData.lastRun.initials}`;
  lastRunDiv.appendChild(lastRunDataEl);
  return lastRunDiv;
}

function titleScreen(mainEl, headerEl, event=undefined) {
  quizData = localStorage.getItem('quizData');
  if(quizData) {
    quizData = JSON.parse(quizData);
  } else {
    quizData = {};
  }
  let titleEl = document.createElement('h1');
  titleEl.id = 'title-marquee';
  titleEl.textContent = 'jQuiz!';
  headerEl.textContent = '';
  headerEl.appendChild(titleEl);
  mainEl.textContent = '';
  var scoreDiv; // appeasing the linter
  if(quizData.lastRun) {
    scoreDiv = generateLastRun();
  } else {
    scoreDiv = document.createElement('div');
  }
  let viewScoresBtn = document.createElement('button');
  viewScoresBtn.textContent = 'View Scores';
  viewScoresBtn.addEventListener('click', scoreClickListener);
  scoreDiv.appendChild(viewScoresBtn);
  mainEl.appendChild(scoreDiv);
  let startBtn = document.createElement('button');
  startBtn.id = 'title-start-button';
  startBtn.textContent = 'Start Game';
  startBtn.addEventListener('click', startClickListener);
  mainEl.appendChild(startBtn);
  headerEl.id = 'title-header';
  mainEl.id = 'title-main';
}

export {titleScreen};
