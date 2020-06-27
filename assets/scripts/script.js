/* jshint esversion: 6 */
import { titleScreen } from './title_screen.js';
import { gameScreen } from './game_screen.js';
const headerEl = document.querySelector('header');
const mainEl = document.querySelector('main');

function runGameScreen() {
  mainEl.textContent = '';
  gameScreen(mainEl, headerEl);
  let awaitEvent = mainEl.addEventListener('gameOver', (event) => {
    mainEl.removeEventListener('gameOver', awaitEvent);
    window.alert(`Game over: final score was ${event.detail.score}`);
    console.log(event);
    runTitleScreen();
  });
}

function runTitleScreen() {
  mainEl.textContent = '';
  titleScreen(mainEl, headerEl);
  let awaitEvent = mainEl.addEventListener('startGame', () => {
    mainEl.removeEventListener('startGame', awaitEvent);
    runGameScreen();
  });
}

runTitleScreen();
