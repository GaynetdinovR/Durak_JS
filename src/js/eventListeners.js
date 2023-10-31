import { display, player, table } from './app.js';
import { cardToTableAnimation } from './Animations/animations.js';

/**
 * Искусственная задержка
 * @param {*} ms number
 * @returns Promise
 */
const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

/**
 * Слушатель карт игрока
 * @param {*} e eventObject 
 */
const playerCardClickListener = (e) => {

	const chosenCard = player.giveCard(e.target.alt);
	display.updatePlayerCards(player.getCards());

	delay(150).then(() => {
		table.addCard(...chosenCard);
		display.updateTable(table.getCards());
	});

	cardToTableAnimation.cardToTableAnimation(...chosenCard, 150);

};

export {
	delay,
	playerCardClickListener
};