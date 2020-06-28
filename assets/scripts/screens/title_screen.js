/* jshint esversion:6 */
function clickListener() {
  this.dispatchEvent(new Event('startGame', {bubbles: true}));
}

function startGameListener() {
  clickTarget.removeEventListener(clickListener);
}
function titleScreen(mainEl, headerEl) {
  let titleEl = document.createElement('h1');
  titleEl.id = 'title';
  titleEl.textContent = 'jQuiz!';
  headerEl.textContent = '';
  headerEl.appendChild(titleEl);

  let startBtnEl = document.createElement('button');
  startBtnEl.textContent = 'Start Game';
  startBtnEl.addEventListener('click', clickListener);
  mainEl.textContent = '';
  mainEl.appendChild(startBtnEl);
}

export {titleScreen};
