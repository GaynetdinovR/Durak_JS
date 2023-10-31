import View from './View.js';
import {deck as deckData} from '../app.js';

export default class DeckView extends View{

	//HTMLElem
	#deckHtmlElem = document.querySelector('#game_deck');

	
	/**
	 * Очищает HTML колоды
	 */
	#clearDeck = () => {
		this.clear(this.#deckHtmlElem);
	};


	/**
     * Обновляет колоду относительно количества карт
     * @param {*} deck [{}, {}, ...]
     * @param {*} trumpCard {}
     * @param {*} isCreated bool
     */
	updateDeck = (deck, trumpCard, isCreated = false) => {

		this.#clearDeck();

		let cardsCount = deckData.getCardsCount(deck);

		while(cardsCount > 0){
			this.createCardBack('deck__card', this.#deckHtmlElem);

			cardsCount--;
		}

		if(!isCreated){
			const className = 'deck__trump-card';
			this.createCard(className, this.#deckHtmlElem, trumpCard.path);
		}

		if(deck.length == 0){
			document.querySelector('.deck__trump-card').style.opacity = '0.5';
		}

	};
}
