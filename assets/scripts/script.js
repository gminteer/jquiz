/* jshint esversion: 6 */
import { titleScreen } from './screens/title_screen.js';
import { gameScreen } from './screens/game_screen.js';
import { gameOverScreen } from './screens/game_over_screen.js';

let headerEl = document.querySelector('header');
let mainEl = document.querySelector('main');

let titleEvent = mainEl.addEventListener('runTitle', () => { titleScreen(mainEl, headerEl); });
let gameEvent = mainEl.addEventListener('startGame', () => { gameScreen(mainEl, headerEl); });
let gameOverEvent = mainEl.addEventListener('gameOver', (event) => { gameOverScreen(mainEl, headerEl, event); });

mainEl.dispatchEvent(new Event('runTitle'));
