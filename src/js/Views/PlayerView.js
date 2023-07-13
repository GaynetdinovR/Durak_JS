import View from './View.js';

export default class PlayerView extends View{

	#playerHtmlElem = document.querySelector('#game_player');

	#clearPlayer = () => {
		this.clear(this.#playerHtmlElem);
	};

	/**
     * Обновляет карты игрока
     * @param {*} cards [{}, {}, ...]
     */
	updatePlayerCards = (cards) => {

		this.#clearPlayer();

		for(const card of cards){
            
			const className = 'player__card';
            
			this.createCard(className, this.#playerHtmlElem, card.path);

		}

		const lastCard = document.querySelector('.player__card:last-child');

		lastCard.classList.add('player__last-card');

	};

}
