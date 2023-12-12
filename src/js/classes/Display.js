import { deckView, botView, playerView, fallView, tableView } from './views/views.js';
import data from '../data/data.json';

export default class Display {
    //Элемент в header с уровнем ИИ
    #headerMode = document.querySelector('#game_mode');
    //Элемент в header с количеством карт
    #headerCardsCount = document.querySelector('#game_cards-count');

    /**
     * Общий метод обновления экрана
     */
    update = () => {
        botView.updateBotCards();
        playerView.updatePlayerCards();
        deckView.updateDeck();
        fallView.updateFall();
        tableView.updateTableCards();
    };

    /**
     * Обновляет header
     */
    updateHeader = () => {
        this.#headerCardsCount.innerHTML = data.cardsCount;
        this.#headerMode.innerHTML = data.mode[0].toUpperCase() + data.mode.slice(1);
    };

    /**
     * Изменяет disabled на кнопке "Бито"
     * @param {*} disabled bool
     */
    isPlayerMoveToFallBtnDisabled = (disabled) => {
        playerView.isPlayerMoveToFallBtnDisabled(disabled);
    };

    /**
     * Изменяет disabled на кнопке "Поднять"
     * @param {*} disabled bool
     */
    isPlayerRaiseBtnDisabled = (disabled) => {
        playerView.isPlayerRaiseBtnDisabled(disabled);
    };
}
