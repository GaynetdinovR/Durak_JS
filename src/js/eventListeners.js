import { display, player, table } from './app.js';

/**
 * Искусственная задержка
 * @param {*} ms number
 * @returns Promise
 */
const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));


//TODO: Сделать чтобы на карту, которую нельзя использовать ставилось disabled
/**
 * Слушатель карт игрока
 * @param {*} e eventObject 
 */
const playerCardClickListener = (e) => {

	let chosenCard = player.findCardByName(e.target.alt);

	if(!table.isPossibleToPlaceCard(chosenCard)) return; 

	chosenCard = player.giveCard(e.target.alt);
	display.updatePlayerCards(player.getCards());

	table.addCard(...chosenCard);
	display.updateTable(table.getCards());

};

export {
	delay,
	playerCardClickListener
};