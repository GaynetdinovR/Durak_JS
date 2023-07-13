import Player from './Player';

export default class Bot extends Player{

	#cards = [];

	constructor(cards, trumpSuit){
		super(cards, trumpSuit);
		this.sortCards(this.#cards);
	}

}