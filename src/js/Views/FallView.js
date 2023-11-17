import View from './View.js';

export default class FallView extends View{

	//HTMLElem
	#fallHtmlElem = document.querySelector('#game_fall');


	/**
     * Обновляет бито относительно количества карт
     * @param {*} fall [{}, {}, ...]
     */
	updateFall = (fall) => {

		const cardsCount = this.getSmalledCardsCount(fall);

		if(cardsCount == 0){ return; }

		this.clear(this.#fallHtmlElem);

		for(let i = cardsCount; i > 0; i--){
			const className = 'fall__card-img';
			this.createCardBack(className, this.#fallHtmlElem);
		}

	};

}
