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

  let startBtn = document.createElement('button');
  startBtn.textContent = 'Start Game';
  startBtn.addEventListener('click', startClickListener);
  mainEl.textContent = '';
  mainEl.appendChild(startBtn);
  let viewScoresBtn = document.createElement('button');
  viewScoresBtn.textContent = 'View Scores';
  viewScoresBtn.addEventListener('click', scoreClickListener);
  mainEl.appendChild(viewScoresBtn);
}

export {titleScreen};
