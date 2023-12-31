import data from './data/data.json';

export default class Deck{

	// Карты
	#cards = data.cards;
	// Масти
	#suits = data.suits;

	constructor(){
		this.#initialize();
	}

	/**
     * Инициализирует необходимые данные
     */
	#initialize = () => {
		this.deck = this.#bundleDeck();
		this.#shuffle();
		this.trumpCard = this.#getTrumpCard();
		this.fall = [];
	};


	/**
     * Добавляет джокеров в колоду
     * @param {*} result [{}, {}, ...]
     * @returns deck
     */
	#addJockers = (deck) => {
		const jockers = data.jockers;

		deck.push(jockers[0]);
		deck.push(jockers[1]);

		return deck;
	};


	/**
     * Возвращает путь к изображению карты
     * @param {*} card string
     * @param {*} suit string
     * @returns string
     */
	#getCardPath = (card, suit) => {
		if(card[0] == '1'){
			return `${data.path.CARDS_DIR}/${card[0] + card[1] + suit[0]}.png`;
		}

		return `${data.path.CARDS_DIR}/${card[0] + suit[0]}.png`;
	};


	/**
     * Возвращает силу карты
     * @param {*} card string
     * @param {*} suit string
     * @returns string
     */
	#getCardPower = (card) => {
		return (this.#cards.indexOf(card) + 2);
	};


	/**
     * Возвращает цвет карты
     * @param {*} card string
     * @param {*} suit string
     * @returns string
     */
	#getCardColor = (suit) => {
		return (suit[0] == 'C' || suit[0] == 'S') ? 'black' : 'red';
	};


	/**
     * Возвращает название карты
     * @param {*} card string
     * @param {*} suit string
     * @returns string
     */
	#getCardName = (card, suit) => {
		return `${card} ${suit}`;
	};


	/**
     * Собирает и возвращает колоду
     * @returns [{}, {}, ...]
     */
	#bundleDeck = () => {

		let deck = [];
    
		for(let card of this.#cards){
			for(let suit of this.#suits){
                
				const cardInfo = {
					path: this.#getCardPath(card, suit),
					name: this.#getCardName(card, suit),
					color: this.#getCardColor(suit),
					power: this.#getCardPower(card),
					suit: suit
				};
    
				deck.push(cardInfo);
    
			}        
		}

		deck = this.#addJockers(deck);
        
		return deck;
    
	};


	/**
     * Перемешивает колоду
     */
	#shuffle = () => {
		this.deck.sort(() => Math.random() - 0.5);
	};


	/**
     * Возвращает козырную карту
     */
	#getTrumpCard = () => {
		return this.deck[this.deck.length - 1];
	};


	/**
     * Перемещает карту в бито
     * @param {*} card {}
     */
	moveToFall = (card) => {

		if(this.deck.length == 0) return;

		const i = this.deck.indexOf(card);

		this.fall.push(this.deck.splice(i, 1));

	}; 


	/**
     * Передает карты, убирая их из колоды
     * @param {*} count numbers
     * @returns 
     */
	giveCards = (count) => {
		return this.deck.splice(0, count);
	};


	/**
     * Возвращает количество карт, которые нужно показать в колоде
     * @param {*} deck [{}, {}, ...]
     * @returns number
     */
	getCardsCount = (deck) => {

		if(deck.length == 54){ return 7; }

		if(deck.length == 1){ return 0; } 

		if(deck.length > 1 && deck.length < 7){ return 1; } 

		if(Math.floor(deck.length / 7) == 7){ return 6; }

		return Math.floor(deck.length / 7);
        
	};

}
