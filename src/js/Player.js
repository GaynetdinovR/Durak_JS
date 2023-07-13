export default class Player{

	#cards = [];

	constructor(cards, trumpSuit){
		this.#cards = cards;
		this.trumpSuit = trumpSuit;
		this.#sortCards();
	}

	/**
     * Геттер для карт игрока
     * @returns [{}, {}, ...]
     */
	getCards = () => {
		return this.#cards;
	};

	/**
     * Сортирует карты игрока ( Сначала джокеры, затем козырные по убыванию, затем остальные по убыванию )
     */
	#sortCards = () => {

		const compare = (a, b) => {
			if (a.power > b.power) return -1;
			if (a.power == b.power) return 0;
			if (a.power < b.power) return 1;
		};

		this.#cards.sort(compare);

		let trumpCards = this.#cards.filter(card => card.suit == this.trumpSuit);
		let jockers = this.#cards.filter(card => card.suit == 'Jocker');
		let notTrumpCards = this.#cards.filter(card => card.suit != this.trumpSuit && card.suit != 'Jocker');

		this.#cards = [...jockers, ...trumpCards, ...notTrumpCards];

	};



}