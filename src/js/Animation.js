import View from './Views/View.js';
import { deck, player, bot, display } from './app.js';

export default class Animation extends View{

	#displayHtmlElem = document.querySelector('.display');

	/**
	 * Анимация старта игры 
	 * @param {*} cardsCount number
	 * @param {*} timeToCard number (ms)
	 */
	initAnimation = (cardsCount, timeToCard) => {

		const timer = setInterval(() => {
			display.updateDeck(deck.deck, deck.trumpCard);
			cardsCount--;

			if(cardsCount < 0){
				clearInterval(timer);
				return;
			}

			const card = this.createCardBack('animation__card', this.#displayHtmlElem);
			const moveTo = this.#getCardMoveToCoords(cardsCount);

			this.#twoPlayersRules(cardsCount);
			this.#moveAnimation(card, timeToCard, moveTo);
			setTimeout(() => {card.parentNode.removeChild(card);}, timeToCard + 20);

		}, timeToCard);

	};

	/**
	 * Возвращает координаты 
	 * @param {*} cardsCount number
	 * @returns object {x: number, y: number}
	 */
	#getCardMoveToCoords = (cardsCount) => {
		if(cardsCount % 2 == 0){
			return {x: 720, y: 442};
		}

		if(cardsCount % 2 != 0){
			return {x: 720, y: 15};
		}
	};

	#twoPlayersRules = (cardsCount) => {
		if(cardsCount % 2 == 0){
			player.addCard(...deck.giveCards(1));
			display.updatePlayerCards(player.getCards());
		}

		if(cardsCount % 2 != 0){
			bot.addCard(...deck.giveCards(1));
			display.updateBotCards(bot.getCards());
		}
	};

	#getOldPlace = (transform) => {
		const temp = {
			x: parseInt(transform.split(',')[4]),
			y: parseInt(transform.split(',')[5]),
		};

		return temp;
	};

	#getTransform = (transform, place) => {
		transform = transform.split(',');

		transform[4] = place.x;
		transform[5] = place.y + ')';

		return transform.join(',');
	};

	#moveAnimation = (elem, time, moveTo) => {
		const elemTransform = window.getComputedStyle(elem).transform;

		const oldPlace = this.#getOldPlace(elemTransform);

		const start = Date.now();
		const stepX = ((moveTo.x - oldPlace.x) / time) * 5;
		const stepY = ((moveTo.y - oldPlace.y) / time) * 5;

		const timer = setInterval(() => {
			const timePassed = Date.now() - start;

			if(timePassed >= time){
				clearInterval(timer);
				return;
			}

			let newPlace = {
				x: Math.round(oldPlace.x + stepX * (timePassed / 5)),
				y: Math.round(oldPlace.y + stepY * (timePassed / 5)),
			};

			elem.style.transform = this.#getTransform(elemTransform, newPlace);

		}, 5);

	};


}