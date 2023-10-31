import View from './View.js';
import { playerCardClickListener } from '../eventListeners.js';

export default class PlayerView extends View{

	//HTMLElem
	#playerHtmlElem = document.querySelector('#game_player');


	/**
	 * Очищает HTML игрока
	 */
	#clearPlayer = () => {
		this.clear(this.#playerHtmlElem);
	};


	/**
     * Обновляет карты игрока
     * @param {*} cards [{}, {}, ...]
     */
	//TODO: Оптимизировать (не удалять все карты, а только те которых нет у игрока)
	updatePlayerCards = (cards) => {
		if(cards.length == 0) return;

		this.#clearPlayer();

		for(const card of cards){
            
			const className = 'player__card';
					
			this.createCardWithListener(className, this.#playerHtmlElem, card.path, card.name, playerCardClickListener);

		}

		const lastCard = document.querySelector('.player__card:last-child');

		lastCard.classList.add('player__last-card');

	};

}
