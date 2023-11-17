import View from './View.js';

export default class TableView extends View{

	//HTMLElem
	#tableHtmlElem = document.querySelector('#game_table');


	/**
     * Обновляет карты бота
     * @param {*} cards [{}, {}, ...]
     */
	updateTableCards = (cards) => {
		if(cards.length == 0) return;

		this.clear(this.#tableHtmlElem);
        
		for(const card of cards){
            
			const className = 'table__card';
					
			this.createCard(className, this.#tableHtmlElem, card.path, card.name);

		}

	};

}