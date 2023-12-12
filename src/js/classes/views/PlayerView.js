import View from './View.js';
import { playerCardClickListener } from '../../eventListeners.js';
import { player, table } from '../../start.js';

export default class PlayerView extends View {
    //Элемент карт игрока
    #playerHtmlElem = document.querySelector('#game_player');
    //Элемент кнопки "Поднять"
    playerRaiseBtn = document.querySelector('#game_raise');
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
    isPlayerRaiseBtnDisabled = (disabled) => {
        this._isDisableElem(this.playerRaiseBtn, disabled);
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

    #formatCardClassName = (card, cards) => {
        const lastCardClassName = card == cards[cards.length - 1] ? ' player__last-card' : '';
        const chosenForAttackCardClassName = card.chosenForAttack ? ' player__card-for-attack' : '';

        return 'player__card' + lastCardClassName + chosenForAttackCardClassName;
    };

    resetChosenCard = () => {
        const chosenCardElem = document.querySelector('.player__card-for-attack');

        if (!chosenCardElem) return;

        const chosenCardName = chosenCardElem.childNodes[0].alt;
        const chosenCard = player.giveCard(player.findCardByName(chosenCardName));

        chosenCard.chosenForAttack = false;

        player.addCard(chosenCard);
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
            let className = this.#formatCardClassName(card, cards);

            const cardElem = this.createCardWithListener(className, this.#playerHtmlElem, card.path, card.name, playerCardClickListener);

            if (!this.#isCardCanUsed(card)) {
                this._isDisableElem(cardElem, true);
            }
        }
    };
}
