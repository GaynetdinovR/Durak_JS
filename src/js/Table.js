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
	 * @param {*} card {}
	 */
	addCard = (card) => {
		card.isBeaten = false;
		this.#cards.push(card);
	};


	/**
	 * "Отдает" все карты со стола 
	 * @returns  [{}, {}, ...]
	 */
	giveAllCards = () => {
		this.#cards = [];

		return this.#cards;
	}; 

	/**
	 * Находит карту, которую нужно побить
	 * @returns {}
	 */
	findCardToBeat = () => {
		for(let card of this.getCards()){
			if(card.isBeaten) continue;

			return card;
		}
	};


	/**
	 * Проверяет возможно ли положить карту на стол
	 * @returns bool
	 */
	isPossibleToPlaceCard = () => {

		//TODO: Сделать метод

		return true;

	};
} 