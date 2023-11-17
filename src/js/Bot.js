import Player from './Player.js';
import { deck, fall, player, table } from './app.js';

export default class Bot extends Player{

	//Карты
	#cards = [];

	constructor(cards, trumpSuit){
		super(cards, trumpSuit);
		this.#cards = this._sortCards(this.#cards);
	}

	/**
	 * Возвращает меньшую не козырную карту
	 * @param {*} cards 
	 * @returns 
	 */
	#getSmallestCard = (cards) => {
		return this._sortCards(cards)[cards.length - 1];
	};


	/**
	 * Проверяет "безопасно" ли окружение
	 * Например: меньше ли у игрока карт, какая фаза игры и т.п.
	 * @returns 
	 */
	#isSafeEnvironment = () => {
		const checkByCardsCount = () => {
			return ((player.getCards().length + 2) >= this.getCards().length );
		};

		const checkByGoodCards = () => {
			let countOfGoodCards = 0;

			for(const card of this.#cards){
				if(this.#isGoodCard(card)){ countOfGoodCards++; }
			}

			return (countOfGoodCards / this.#cards.length) >= 0.5;
		};
	
		const checkByGamePhase = () => {
			const results = {
				'1': true,
				'2': true,
				'3': false
			};

			return results[this.#getGamePhase()];
		};

		return ((checkByGamePhase() && checkByCardsCount()) || (checkByGoodCards() && checkByGamePhase()));
	};


	/**
	 * Получает фазу игры
	 * @returns string
	 */
	#getGamePhase = () => {
		if(deck.deck.length >= 6 && fall.fall.length <= 15) return '1';

		if(deck.deck.length < 6 && fall.fall.length > 15 && fall.fall.length <= 32) return '2';

		if(deck.deck.length == 0 && fall.fall.length > 32) return '3';
	};


	/**
	 * Проверяет "хорошая" ли карта
	 * Карта "хорошая" если: 1. Ее значение >= 10, 2. Она козырная и ее значение >= 8
	 * @param {*} card 
	 * @returns 
	 */
	#isGoodCard = (card) => {
		return (card.power >= 10 || (card.suit == this.trumpSuit && card.power >= 8));
	};


	/**
	 * Проверяет является ли карта парой для карт бота
	 * @param {*} card {}
	 * @returns bool
	 */
	#isPairForCard = (card) => {
		for(const botCard of this.#cards){
			if(botCard.power == card.power){
				return true;
			}
		}

		return false;
	};


	/**
	 * Проверяет рационально ли бить карту (для продвинутого ИИ)
	 * Например: если карта мелкая, а карты для защиты крупные, то не рационально, и т.п.
	 * @param {*} cardsToDefend {}
	 * @param {*} cardToBeat {}
	 * @returns bool
	 */
	#isRationalToBeatCard = (cardsToDefend, cardToBeat) => {
		const isRational = (cardToDefend, cardToBeat) => {
			if(this.#isPairForCard(cardToBeat)) return false;
	
			if(this.#isGoodCard(cardToBeat)) return false;
	
			if(this.#isGoodCard(cardToDefend)) return false;
			
			return true;
		};

		const results = [];

		for(const card of cardsToDefend){
			results.push(isRational(card, cardToBeat));
		}

		return (!results.every((item) => item == false));
	};


	/**
	 * Проверяет может ли карта побить другую карту
	 * @param {*} cardToDefend {}
	 * @param {*} cardToBeat {}
	 * @returns bool
	 */
	#isCardCanBeat = (cardToDefend, cardToBeat) => {
		if(cardToDefend.suit == this.trumpSuit){
			if(cardToBeat.suit == this.trumpSuit){
				if(cardToDefend.power > cardToBeat.power){
					return true;
				}
				return false;
			}
			return true;
		}
	
		if(cardToDefend.suit == cardToBeat.suit && cardToDefend.power > cardToBeat.power){
			return true;
		}
		
		return false;
	};


	/**
	 * Находит в руке бота все карты, которые могут побить атакующую карту
	 * @param {*} cardToBeat {}
	 * @returns [{}, {}, ...]
	 */
	#findCardsToDefend = (cardToBeat) => {
		const cardsToDefend = [];
		
		for(let botCard of this.getCards()){
			if(this.#isCardCanBeat(botCard, cardToBeat)){
				cardsToDefend.push(botCard);
			}
		}

		return cardsToDefend;
	};


	/**
	 * Забирает в руку боту все карты со стола
	 */
	#getAllCardsFromTable = () => {
		for(const card of table.giveAllCards()){
			this.addCard(card);
		}
	};


	/**
	 * Бьет карту
	 * @param {*} cardsToDefend 
	 */
	#beatCard = (cardsToDefend) => {
		//TODO: переделать для продвинутого ИИ
		table.beatCard(this.#getSmallestCard(cardsToDefend));
	};
	

	/**
	 * Решает поднять карту или побить ее
	 */
	#defend = () => {
		const cardToBeat = table.findCardToBeat();
		const cardsToDefend = this.#findCardsToDefend(cardToBeat);

		if(this.#isSafeEnvironment()){
			if(cardsToDefend){
				if(this.#isRationalToBeatCard(cardsToDefend, cardToBeat)){
					this.#beatCard(cardsToDefend);
				} else {
					this.#getAllCardsFromTable();
				}
			} else {
				this.#getAllCardsFromTable();
			}
		}

		/*
		console.log('card to beat: ', cardToBeat);
		console.log('cards to defend: ', cardsToDefend);
		console.log('is rational to beat: ', this.isRationalToBeatCard(cardsToDefend, cardToBeat));
		console.log('is safe enviroment: ', this.isSafeEnvironment());
		*/
	};

	#attack = () => {
		return;
	}; 


	/**
	 * По изменению карт решает атаковать или защищаться
	 * @param {*} oldCards [{}, {}, ...]
	 */
	#botMove = (oldCards) => {

		const whose_move = localStorage.getItem('whose_move');
		const cardsChanges = table.getCards().length - oldCards.length;

		if(cardsChanges > 0){
			if(whose_move == 'bot'){ this.#attack(); }

			if(whose_move == 'player'){ this.#defend(); }
		}

		this.monitorChanges(Object.assign([], table.getCards()));

	};


	/**
	 * Мониторит изменения стола
	 * @param {*} cards [{}, {}, ...]
	 */
	monitorChanges = (cards) => {

		const timer = setInterval(() => {

			if(JSON.stringify(cards) != JSON.stringify(table.getCards())){
				this.#botMove(cards);

				clearInterval(timer);
				return;
			}

		}, 400);
	};

}