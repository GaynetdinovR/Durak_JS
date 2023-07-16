'use strict';

import Deck from './Deck.js';
import Display from './Display.js';
import Animation from './Animation.js';
import Player from './Player.js';
import Bot from './Bot.js';

const deck = new Deck();
const display = new Display();
const animation = new Animation();

const cardsCount = 12;
const initTime = 150; 

const bot = new Bot([], deck.trumpCard.suit);
const player = new Player([], deck.trumpCard.suit);

animation.initAnimation(cardsCount, initTime);

display.updateFall(deck.fall);

export {
	deck,
	player,
	bot,
	display
};
