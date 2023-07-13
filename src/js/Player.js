export default class Player{

	#cards = [];

	constructor(cards, trumpSuit){
		this.#cards = cards;
		this.trumpSuit = trumpSuit;
		this.sortCards(this.#cards);
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
	sortCards = (cards) => {

		const compare = (a, b) => {
			if (a.power > b.power) return -1;
			if (a.power == b.power) return 0;
			if (a.power < b.power) return 1;
		};

		cards.sort(compare);

		let trumpCards = cards.filter(card => card.suit == this.trumpSuit);
		let jockers = cards.filter(card => card.suit == 'Jocker');
		let notTrumpCards = cards.filter(card => card.suit != this.trumpSuit && card.suit != 'Jocker');

		cards = [...jockers, ...trumpCards, ...notTrumpCards];

	};



}