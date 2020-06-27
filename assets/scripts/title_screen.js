/* jshint esversion:6 */
var eventTarget;
var clickTarget;
function clickListener() {
  eventTarget.dispatchEvent(new Event('startGame'));
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
  // pass elements up to module global for event handling
  eventTarget = mainEl;
  clickTarget = startBtnEl;
  clickTarget.addEventListener('click', clickListener);
  mainEl.textContent = '';
  mainEl.appendChild(startBtnEl);
}

export {titleScreen};
