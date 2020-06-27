/* jshint esversion:6 */
function titleScreen(divEl) {
  let startBtnEl = document.createElement('button');
  startBtnEl.textContent = 'Start Game';
  startBtnEl.addEventListener('click', () => {
    divEl.dispatchEvent(new Event('startGame'));
  });
  divEl.appendChild(startBtnEl);
}

export {titleScreen};
