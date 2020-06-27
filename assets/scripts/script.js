/* jshint esversion: 6 */
import { titleScreen } from './title_screen.js';
import { gameScreen } from './game_screen.js';
const headerEl = document.querySelector('header');
const mainEl = document.querySelector('main');

function runGameScreen() {
  mainEl.textContent = '';
  gameScreen(mainEl);
}

function runTitleScreen() {
  mainEl.textContent = '';
  titleScreen(mainEl);
  let awaitEvent = mainEl.addEventListener('startGame', () => {
    mainEl.removeEventListener('startGame', awaitEvent);
    runGameScreen();
  });
}

runTitleScreen();
