/* jshint esversion: 6 */
import { titleScreen } from './screens/title_screen.js';
import { gameScreen } from './screens/game_screen.js';
import { scoreScreen } from './screens/score_screen.js';

let headerEl = document.querySelector('header');
let mainEl = document.querySelector('main');

let titleEvent = mainEl.addEventListener('runTitle', (event) => { titleScreen(mainEl, headerEl, event); });
let gameEvent = mainEl.addEventListener('startGame', () => { gameScreen(mainEl, headerEl); });
let gameOverEvent = mainEl.addEventListener('gameOver', (event) => { scoreScreen(mainEl, headerEl, event); });

mainEl.dispatchEvent(new Event('runTitle'));
