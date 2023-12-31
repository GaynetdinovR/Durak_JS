import {
	deckView, 
	botView, 
	playerView, 
	fallView,
	tableView
} from './Views/views.js';

export default class Display{

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