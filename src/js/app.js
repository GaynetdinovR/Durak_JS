'use strict';

import Deck from './Deck.js';
import Display from './Display.js';
import Player from './Player.js';

const deck = new Deck();
const display = new Display();

const player = new Player(deck.giveCards(6), deck.trumpCard.suit);

display.updateDeck(deck.deck, deck.trumpCard);
display.updateFall(deck.fall, true);
display.updatePlayerCards(player.getCards());
