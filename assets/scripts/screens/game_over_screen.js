/* jshint esversion:6 */
function gameOverScreen(mainEl, headerEl) {
  if(event.detail.timeLeft) {
    console.log(`${event.detail.timeLeft} seconds remaining!`);
  }
  window.alert(`Game over: final score was ${event.detail.score}`);
  mainEl.dispatchEvent(new Event('runTitle'));
}

export {gameOverScreen};
