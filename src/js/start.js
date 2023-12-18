'use strict';

import Display from './classes/Display.js';
import Table from './classes/Table.js';
import Fall from './classes/Fall.js';
import Game from './classes/Game.js';
import Other from './classes/Other.js';

const fall = new Fall();
const display = new Display();
const table = new Table();
const game = new Game();
const other = new Other();

let deck;
let bot;
let player;

const setDeck = (value) => (deck = value);
const setBot = (value) => (bot = value);
const setPlayer = (value) => (player = value);

export { deck, setDeck, setBot, setPlayer, player, bot, display, table, fall, game, other };
