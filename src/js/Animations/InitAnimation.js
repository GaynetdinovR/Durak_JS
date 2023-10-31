import { deck, bot, player, display } from '../app.js';
import Animation from './Animation.js';

export default class InitAniamtion extends Animation{

	/**
	 * Анимация старта игры 
	 * @param {*} cardsCount number
	 * @param {*} timeToCard number (ms)
	 */
	initAnimation = (cardsCount, animationTime) => {
		const timeToCard = animationTime / cardsCount;
		
		const timer = setInterval(() => {

			display.updateDeck(deck.deck, deck.trumpCard);
			cardsCount--;

			if(cardsCount < 0){
				clearInterval(timer);
				return;
			}

			const animationCard = this.createCardBack('animation__card', this._displayHtmlElem);
			const newPlace = this.#getNewPlace(cardsCount);

			this.#initAction(cardsCount);
			this._moveAnimation(animationCard, timeToCard, newPlace);

			setTimeout(() => {animationCard.parentNode.removeChild(animationCard);}, timeToCard + 20);

		}, timeToCard);

	};

	/**
	 * Добавление карт боту/игроку
	 * @param {*} cardsCount number
	 */
	#initAction = (cardsCount) => {
		if(cardsCount % 2 == 0){
			player.addCard(...deck.giveCards(1));
			display.updatePlayerCards(player.getCards());
		}
	
		if(cardsCount % 2 != 0){
			bot.addCard(...deck.giveCards(1));
			display.updateBotCards(bot.getCards());
		}
	
	};

	/**
	 * Возвращает координаты 
	 * @param {*} cardsCount number
	 * @returns object {x: number, y: number} (px)
	 */
	#getNewPlace = (cardsCount) => {
		return (cardsCount % 2 === 0) ? this._playerCenter : this._botCenter;
	};
	
}