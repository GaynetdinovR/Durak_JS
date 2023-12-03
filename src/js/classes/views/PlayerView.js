import View from './View.js';
import { playerCardClickListener } from '../../eventListeners.js';
import { player, table } from '../../start.js';

export default class PlayerView extends View {
    //Элемент карт игрока
    #playerHtmlElem = document.querySelector('#game_player');
    //Элемент кнопки "Поднять"
    playerGetAllCardsBtn = document.querySelector('#game_get-all-cards');
    //Элемент кнопки "Бито"
    playerMoveToFallBtn = document.querySelector('#game_move-to-fall');

    /**
     * Изменяет disabled на кнопке "Бито"
     * @param {*} disabled bool
     */
    isPlayerMoveToFallBtnDisabled = (disabled) => {
        this._isDisableElem(this.playerMoveToFallBtn, disabled);
    };

    /**
     * Изменяет disabled на кнопке "Поднять"
     * @param {*} disabled bool
     */
    isPlayerGetAllCardsBtnDisabled = (disabled) => {
        this._isDisableElem(this.playerGetAllCardsBtn, disabled);
    };

    /**
     * Проверяет можно ли использовать карту
     * @param {*} card {}
     * @returns bool
     */
    #isCardCanUsed = (card) => {
        if (localStorage.getItem('whose_move') == 'player') {
            return table.isPossibleToPlaceCardAttack(card);
        }

        return table.isPossibleToPlaceCardDefend(card);
    };

    /**
     * Обновляет карты игрока
     * @param {*} cards [{}, {}, ...]
     */
    updatePlayerCards = () => {
        const cards = player.getCards();

        this.clear(this.#playerHtmlElem);

        if (cards.length == 0) return;

        for (const card of cards) {
            let className = 'player__card';

            className += card.chosenForAttack ? ' player__card-for-attack' : '';

            const cardElem = this.createCardWithListener(className, this.#playerHtmlElem, card.path, card.name, playerCardClickListener);

            if (!this.#isCardCanUsed(card)) {
                this._isDisableElem(cardElem, true);
            }
        }

        const lastCard = document.querySelector('.player__card:last-child');

        lastCard.classList.add('player__last-card');
    };
}
