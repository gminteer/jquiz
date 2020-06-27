/* jshint esversion: 6 */
import { titleScreen } from './title_screen.js';
import { gameScreen } from './game_screen.js';

let headerEl = document.querySelector('header');
let mainEl = document.querySelector('main');

let titleEvent = mainEl.addEventListener('runTitle', () => { titleScreen(mainEl, headerEl); });
let gameEvent = mainEl.addEventListener('startGame', () => { gameScreen(mainEl, headerEl); });
let gameOverEvent = mainEl.addEventListener('gameOver', (event) => {
  window.alert(`Game over: final score was ${event.detail.score}`);
  mainEl.dispatchEvent(new Event('runTitle'));
});

mainEl.dispatchEvent(new Event('runTitle'));
