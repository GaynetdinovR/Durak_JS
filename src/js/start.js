'use strict';

import Deck from './classes/Deck.js';
import Display from './classes/Display.js';
import Player from './classes/Player.js';
import Bot from './classes/bot/Bot.js';
import Table from './classes/Table.js';
import Fall from './classes/Fall.js';
import Game from './classes/Game.js';
import Other from './classes/Other.js';
import { delay, raiseBtnListener, moveToFallBtnListener } from './eventListeners.js';
import { playerView } from './classes/views/views.js';

const deck = new Deck();
const fall = new Fall();
const display = new Display();
const table = new Table();
const game = new Game();
const other = new Other();

const cardsCountToPlayer = 6;

const bot = new Bot([], deck.getTrumpCard().suit);
const player = new Player([], deck.getTrumpCard().suit);

localStorage.setItem('whose_move', 'bot');

game.giveCardsToPlayersInit(cardsCountToPlayer);

display.update();
display.updateHeader();

bot.monitorChanges(structuredClone(table.getCards()));

delay(1000).then(() => {
    playerView.playerMoveToFallBtn.addEventListener('click', moveToFallBtnListener);
    playerView.playerRaiseBtn.addEventListener('click', raiseBtnListener);
});

export { deck, player, bot, display, table, fall, game, other };
