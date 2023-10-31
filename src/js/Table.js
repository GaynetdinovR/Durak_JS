export default class Table{

	#cards = [];

	/**
	 * Возвращает карты стола
	 * @returns [{}, {}, ...]
	 */
	getCards = () => {
		return this.#cards;
	};

	/**
	 * Добавляет карту столу
	 * @param {*} card string
	 */
	addCard = (card) => {
		this.#cards.push(card);
	};
} 