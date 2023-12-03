import { display, player, table, game } from './start.js';

/**
 * Искусственная задержка
 * @param {*} ms number
 * @returns Promise
 */
const delay = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Слушатель карт игрока
 * @param {*} e eventObject
 */
const playerCardClickListener = (e) => {
    if (localStorage.getItem('whose_move') == 'player') {
        display.isPlayerMoveToFallBtnDisabled(false);
        game.playerAttack(e.target.alt);
        return;
    }

    game.playerDefend(e.target.alt);
};

/**
 * Слушатель кнопки "Бито"
 * @param {*} e eventObject
 */
const moveToFallBtnListener = () => {
    display.isPlayerMoveToFallBtnDisabled(true);
    game.newMoveAction();
};

/**
 * Слушатель кнопки "Поднять"
 * @param {*} e eventObject
 */
const getAllCardsBtnListener = () => {
    display.isPlayerGetAllCardsBtnDisabled(true);

    player.getAllCardsFromTable();

    display.update();

    game.giveCardsToPlayers();
};

/**
 * Слушатель карты, от которой защищается игрок
 */
const playerTableCardListener = () => {
    const cardToDefendName = document.querySelector('.player__card-for-attack-img').alt;

    const cardToDefend = player.giveCard(player.findCardByName(cardToDefendName));

    table.beatCard(cardToDefend);

    delete cardToDefend['chosenForAttack'];

    display.update();
};

export { delay, playerCardClickListener, playerTableCardListener, moveToFallBtnListener, getAllCardsBtnListener };
