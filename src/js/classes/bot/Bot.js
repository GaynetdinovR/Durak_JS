import Player from '../Player.js';
import { deck, display, fall, player, table } from '../../start.js';

import { botAttack } from './BotAttack.js';
import { botDefend } from './BotDefend.js';

export default class Bot extends Player {
    //Карты
    #cards = [];

    constructor(cards, trumpSuit) {
        super(cards, trumpSuit);
        this.setCards(this._getSortedCards(this.getCards()));
    }

    /**
     * Возвращает меньшую карту по сортированной колоде
     * @param {*} cards
     * @returns
     */
    getSmallestCard = (cards) => {
        return this._getSortedCards(cards)[cards.length - 1];
    };

    /**
     * Проверяет безопасно ли окружение по количеству карт игрока и бота
     * @returns bool
     */
    #checkByCardsCount = () => {
        return player.getCards().length + 2 >= this.getCards().length;
    };

    /**
     * Проверяет безопасно ли окружение по "хорошим" картам бота
     * @returns bool
     */
    #checkByGoodCards = () => {
        let countOfGoodCards = 0;

        for (const card of this.getCards()) {
            if (this._isGoodCard(card)) {
                countOfGoodCards++;
            }
        }

        return countOfGoodCards / this.getCards().length >= 0.5;
    };

    /**
     * Проверяет безопасно ли окружение по фазе игры
     * @returns bool
     */
    #checkByGamePhase = () => {
        const results = {
            1: true,
            2: true,
            3: false,
        };

        return results[this.#getGamePhase()];
    };

    /**
     * Проверяет "безопасно" ли окружение
     * Например: меньше ли у игрока карт, какая фаза игры и т.п.
     * @returns bool
     */
    isSafeEnvironment = () => {
        const cardsCoundCondition = this.#checkByGamePhase() && this.#checkByCardsCount();
        const goodCardsCondition = this.#checkByGoodCards() && this.#checkByGamePhase();

        return cardsCoundCondition || goodCardsCondition;
    };

    /**
     * Получает фазу игры
     * @returns string
     */
    #getGamePhase = () => {
        if (deck.getDeck().length >= 6 && fall.getFall().length <= 15) return '1';

        if (deck.getDeck().length < 6 && fall.getFall().length > 15 && fall.getFall().length <= 32) return '2';

        if (deck.getDeck().length == 0 && fall.getFall().length > 32) return '3';
    };

    /**
     * Проверяет "хорошая" ли карта
     * Карта "хорошая" если: 1. Ее значение >= 10, 2. Она козырная и ее значение >= 8
     * @param {*} card
     * @returns
     */
    isGoodCard = (card) => {
        return card.power >= 10 || (card.suit == this.trumpSuit && card.power >= 8);
    };

    /**
     * Проверяет является ли карта парой для карт бота
     * @param {*} card {}
     * @returns bool
     */
    isPairForCard = (card) => {
        for (const botCard of this.getCards()) {
            if (botCard.power == card.power) {
                return true;
            }
        }

        return false;
    };

    /**
     * Решает атаковать или защищаться
     */
    #botMove = () => {
        const whose_move = localStorage.getItem('whose_move');

        if (whose_move == 'bot') {
            botAttack.attack();
        }

        if (whose_move == 'player') {
            botDefend.defend();
        }

        display.update();

        this.monitorChanges(structuredClone(table.getCards()));
    };

    /**
     * Мониторит изменения стола
     * @param {*} cards [{}, {}, ...]
     */
    monitorChanges = (tableCards) => {
        const timer = setInterval(() => {
            const condition1 = JSON.stringify(tableCards) != JSON.stringify(table.getCards());
            const condition2 = localStorage.getItem('whose_move') == 'bot' && table.getCards().length == 0;

            if (condition1 || condition2) {
                this.#botMove();

                clearInterval(timer);
                return;
            }
        }, 200);
    };
}
