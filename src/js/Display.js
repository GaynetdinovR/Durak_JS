import {
	deckView, 
	botView, 
	playerView, 
	fallView,
	tableView
} from './Views/views.js';

import {
	fall,
	bot,
	deck,
	player
} from './app.js';

export default class Display{


	/**
	 * Необходимые для начала игры обновления частей экрана
	 */
	initUpdate = () => {
		this.updateFall(fall.fall);
		this.updateBotCards(bot.getCards());
		this.updatePlayerCards(player.getCards());
		this.updateDeck(deck.deck, deck.trumpCard, false);
	};

	updateDeck = (deck, trumpCard, isCreated) => {
		deckView.updateDeck(deck, trumpCard, isCreated);
	};

	updateFall = (fall) => {
		fallView.updateFall(fall);
	};

	updatePlayerCards = (cards) => {
		playerView.updatePlayerCards(cards);
	};

	updateBotCards = (cards) => {
		botView.updateBotCards(cards);
	};

	updateTable = (cards) => {
		tableView.updateTableCards(cards);
	}; 

}