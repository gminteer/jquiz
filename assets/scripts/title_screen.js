/* jshint esversion:6 */
function titleScreen(divEl, headerEl) {
  const startBtnEl = document.createElement('button');
  const titleEl = headerEl.querySelector('h1');
  titleEl.textContent = 'jQuiz!';
  startBtnEl.textContent = 'Start Game';
  startBtnEl.addEventListener('click', () => {
    divEl.dispatchEvent(new Event('startGame'));
  });
  divEl.appendChild(startBtnEl);
}

export {titleScreen};
