/* jshint esversion:6 */
function startClickListener() {
  this.removeEventListener('click', startClickListener);
  this.dispatchEvent(new Event('startGame', {bubbles: true}));
}
function scoreClickListener() {
  this.removeEventListener('click', scoreClickListener);
  this.dispatchEvent(new Event('gameOver', {bubbles: true}));
}
function titleScreen(mainEl, headerEl, event=undefined) {
  if(event) {
    console.log(event);
  }
  let titleEl = document.createElement('h1');
  titleEl.id = 'title';
  titleEl.textContent = 'jQuiz!';
  headerEl.textContent = '';
  headerEl.appendChild(titleEl);

  let startBtnEl = document.createElement('button');
  startBtnEl.textContent = 'Start Game';
  startBtnEl.addEventListener('click', startClickListener);
  mainEl.textContent = '';
  mainEl.appendChild(startBtnEl);
  let viewScoresBtnEl = document.createElement('button');
  viewScoresBtnEl.textContent = 'View Scores';
  viewScoresBtnEl.addEventListener('click', scoreClickListener);
  mainEl.appendChild(viewScoresBtnEl);
}

export {titleScreen};
