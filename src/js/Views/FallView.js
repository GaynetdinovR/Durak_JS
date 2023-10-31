import View from './View.js';
import {deck as deckData} from '../app.js';

export default class FallView extends View{

	//HTMLElem
	#fallHtmlElem = document.querySelector('#game_fall');


	/**
	 * Очищает HTML бито
	 */
	#clearFall = () => {
		this.clear(this.#fallHtmlElem);
	};

	
	/**
     * Обновляет бито относительно количества карт
     * @param {*} fall [{}, {}, ...]
     */
	updateFall = (fall) => {

		let cardsCount = deckData.getCardsCount(fall);

		if(cardsCount == 0){ return; }

		this.#clearFall();

		while(cardsCount > 0){
			const className = 'fall__card-img';
			this.createCardBack(className, this.#fallHtmlElem);

			cardsCount--;
		}

	};

}
