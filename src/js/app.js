'use strict';

import Deck from './Deck.js';
import Display from './Display.js';
import Player from './Player.js';
import Bot from './Bot.js';
import Table from './Table.js';
import Fall from './Fall.js';
import Game from './Game.js';

const deck = new Deck();
const fall = new Fall();
const display = new Display();
const table = new Table();
const game = new Game();

const cardsCountToPlayer = 6;

const bot = new Bot([], deck.trumpCard.suit);
const player = new Player([], deck.trumpCard.suit);

game.giveCardsToPlayers(cardsCountToPlayer);

localStorage.setItem('whose_move', 'player');

display.initUpdate();

bot.monitorChanges(Object.assign([], table.getCards()));

console.log(bot.getCards());

export {
	deck,
	player,
	bot,
	display,
	table,
	fall
};
