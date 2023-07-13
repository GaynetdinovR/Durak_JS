import View from './View.js';

export default class BotView extends View{

	#botHtmlElem = document.querySelector('#game_bot');

	#clearBot = () => {
		this.clear(this.#botHtmlElem);
	};

	/**
     * Обновляет карты бота
     * @param {*} cards [{}, {}, ...]
     */
	updateBotCards = (cards) => {

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