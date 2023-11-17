import {bot, player, deck} from './app.js';

export default class Game{

	/**
	 * Раздает карты игрокам
	 * @param {*} countToPlayer число карт на игрока / number
	 */
	giveCardsToPlayers = (countToPlayer) => {
		for(let i = 0; i < countToPlayer * 2; i++){
			if(i % 2 == 0){
				bot.addCard(...deck.giveCards(1));
				continue;
			}

			player.addCard(...deck.giveCards(1));
		}
	};

}