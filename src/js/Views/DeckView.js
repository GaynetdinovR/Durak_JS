import View from './View.js';

export default class DeckView extends View{

	//HTMLElem
	#deckHtmlElem = document.querySelector('#game_deck');


	/**
     * Обновляет колоду относительно количества карт
     * @param {*} deck [{}, {}, ...]
     * @param {*} trumpCard {}
     * @param {*} isCreated bool
     */
	updateDeck = (deck, trumpCard, isCreated = false) => {

		this.clear(this.#deckHtmlElem);

		for(let i = this.getSmalledCardsCount(deck); i > 0; i--){
			this.createCardBack('deck__card', this.#deckHtmlElem);
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
