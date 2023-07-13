'use strict';

import Deck from './Deck.js';
import Display from './Display.js';
import Player from './Player.js';
import Bot from './Bot.js';

export const deck = new Deck();
const display = new Display();

const bot = new Bot(deck.giveCards(6), deck.trumpCard.suit);
const player = new Player(deck.giveCards(6), deck.trumpCard.suit);

display.updateDeck(deck.deck, deck.trumpCard);
display.updateFall(deck.fall);
display.updatePlayerCards(player.getCards());
display.updateBotCards(bot.getCards());
