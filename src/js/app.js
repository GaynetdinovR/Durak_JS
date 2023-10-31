'use strict';

import Deck from './Deck.js';
import Display from './Display.js';
import Animation from './Animations/Animation.js';
import Player from './Player.js';
import Bot from './Bot.js';
import Table from './Table.js';

import { initAnimation } from './Animations/animations.js';

const deck = new Deck();
const display = new Display();
const table = new Table();
const animation = new Animation();

const cardsCount = 12;
const initTime = 400/*1600*/; 

const bot = new Bot([], deck.trumpCard.suit);
const player = new Player([], deck.trumpCard.suit);

initAnimation.initAnimation(cardsCount, initTime);

display.updateFall(deck.fall);

export {
	deck,
	player,
	bot,
	display,
	table,
	animation,
};
