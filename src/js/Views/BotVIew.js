import View from './View.js';

export default class BotView extends View{

	//HTMLElem
	#botHtmlElem = document.querySelector('#game_bot');


	/**
	 * Очищает HTML бота
	 */
	#clearBot = () => {
		this.clear(this.#botHtmlElem);
	};


	/**
     * Обновляет карты бота
     * @param {*} cards [{}, {}, ...]
     */
	updateBotCards = (cards) => {
		if(cards.length == 0) return;

		this.#clearBot();
        
		let cardsCount = cards.length;

		while(cardsCount > 0){
            
			const className = 'bot__card';
            
			this.createCardBack(className, this.#botHtmlElem);
            
			cardsCount--;
		}

		const lastCard = document.querySelector('.bot__card:last-child');
		lastCard.classList.add('bot__last-card');

	};

}