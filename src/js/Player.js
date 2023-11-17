export default class Player{

	//Карты
	#cards = [];

	constructor(cards, trumpSuit){
		this.trumpSuit = trumpSuit;
		this.#cards = this._sortCards(cards);
	}
	
	/**
     * Возвращает карты игрока
     * @returns [{}, {}, ...]
     */
	getCards = () => {
		return this.#cards;
	};

	/**
	 * Добавляет карты
	 * @param {*} card object {} 
	 */
	addCards = (cards) => {
		for(const card of cards){
			this.addCard(card);
		}
	};


	/**
	 * Добавляет карту
	 * @param {*} card object {} 
	 */
	addCard = (card) => {
		this.#cards = this._sortCards([...this.#cards, card]);
	};


	/**
	 * "Отдает" карту по имени
	 * @param {*} cardName string
	 * @returns object {}
	 */
	giveCard = (cardName) => {
		const card = this.findCardByName(cardName);

		this._deleteCard(cardName);

		return card;
	};


	/**
	 * Возвращает карту по имени
	 * @param {*} name string
	 * @returns object {}
	 */
	findCardByName = (name) => {
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
	 * Сортирует карты игрока ( Сначала козырные по убыванию, затем остальные по убыванию )
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

		const trumpCards = cards.filter(card => card.suit == this.trumpSuit);
		const notTrumpCards = cards.filter(card => card.suit != this.trumpSuit && card.suit != 'Jocker');

		return [...trumpCards, ...notTrumpCards];

	};



}