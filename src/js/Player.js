export default class Player{

	#cards = [];

	constructor(cards, trumpSuit){
		this.#cards = cards;
		this.trumpSuit = trumpSuit;
		this.#cards = this._sortCards(this.#cards);
	}

	
	/**
     * Возвращает карты игрока
     * @returns [{}, {}, ...]
     */
	getCards = () => {
		return this.#cards;
	};


	/**
	 * Добавляет карту
	 * @param {*} card object {} 
	 */
	addCard = (card) => {
		this.#cards.push(card);
		this.#cards = this._sortCards(this.#cards);
	};


	/**
	 * "Отдает" карту по имени
	 * @param {*} cardName string
	 * @returns object {}
	 */
	giveCard = (cardName) => {
		const card = this._findCardByName(cardName);

		this._deleteCard(cardName);

		return card;
	};


	/**
	 * Возвращает карту по имени
	 * @param {*} name string
	 * @returns object {}
	 */
	_findCardByName = (name) => {
		return this.#cards.filter(card => card.name === name);
	};


	/**
	 * Удаляет карту по имени
	 * @param {*} cardName string
	 */
	_deleteCard = (cardName) => {
		this.#cards = this.#cards.filter(card => card.name != cardName);
	};


	/**
	 * Сортирует карты игрока ( Сначала джокеры, затем козырные по убыванию, затем остальные по убыванию )
	 * @param {*} cards [{}, {}, ...]
	 * @returns [{}, {}, ...]
	 */
	_sortCards = (cards) => {

		const compare = (a, b) => {
			if (a.power > b.power) return -1;
			if (a.power == b.power) return 0;
			if (a.power < b.power) return 1;
		};

		cards.sort(compare);

		let trumpCards = cards.filter(card => card.suit == this.trumpSuit);
		let jockers = cards.filter(card => card.suit == 'Jocker');
		let notTrumpCards = cards.filter(card => card.suit != this.trumpSuit && card.suit != 'Jocker');

		return [...jockers, ...trumpCards, ...notTrumpCards];

	};



}