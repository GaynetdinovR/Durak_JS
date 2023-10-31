import { player, bot, display, table } from '../app.js';
import { delay } from '../eventListeners.js';
import Animation from './Animation.js';

export default class CardToTableAnimation extends Animation{

	/**
	 * Анимация перекладывания карты на стол
	 * @param {*} card HTMLElem
	 * @param {*} animationTime number (ms)
	 */
	cardToTableAnimation = (card, animationTime) => {

		display.updatePlayerCards(player.getCards());
		display.updateBotCards(bot.getCards());

		const cardInAnim = this.createCard('animation__card', this._displayHtmlElem, card.path);

		const newPlace = this.#getCardNewPlace(table.getCards().length);
		const oldPlace = this._playerCenter; // TODO: do to bot's oldPlace too

		this._moveAnimation(cardInAnim, animationTime, newPlace, oldPlace);
		delay(animationTime + 20).then(() => {cardInAnim.parentNode.removeChild(cardInAnim);});

		display.updateTable(table.getCards());

	};

	
	/**
	 * Возвращает координаты 
	 * @param {*} cardsCount number
	 * @returns object {x: number, y: number}
	 */
	#getCardNewPlace = (cardsCount) => {
		switch(cardsCount){
		case 0: 
			return {x: 744, y: 265};
		case 1: 
			return {x: 864, y: 265};
		case 2: 
			return {x: 624, y: 265};
		case 3: 
			return {x: 984, y: 265};
		case 4: 
			return {x: 504, y: 265};
		case 5: 
			return {x: 1104, y: 265};
		}
	};
}