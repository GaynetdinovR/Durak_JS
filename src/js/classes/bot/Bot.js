import Player from '../Player.js';
import { display, game, player, table } from '../../start.js';

import { botAttack } from './BotAttack.js';
import { botDefend } from './BotDefend.js';

export default class Bot extends Player {
    //Карты
    #cards = [];
    //"Слабые" масти, карты которых игрок поднял или отбил козырем
    #playerWeakSuits = { atMove: 0, suits: [] };
    //Поднятые игроком карты
    #playerRaisedCards = [];

    constructor(cards, trumpSuit) {
        super(cards, trumpSuit);
        this.setCards(this._getSortedCards(this.getCards()));
    }

    /**
     * Геттер для "слабых" мастей
     * @returns object
     */
    getWeakSuits = () => {
        return this.#playerWeakSuits;
    };

    /**
     * Добавить карты к поднятым игроком карт
     * @param {*} cards [{}, {}, ...]
     */
    addPlayerRaisedCards = (cards) => {
        this.setPlayerRaisedCards([...this.getPlayerRaisedCards(), ...cards]);
    };

    /**
     * Сеттер для поднятых игроком карт
     * @param {*} cards [{}, {}, ...]
     */
    setPlayerRaisedCards = (cards) => {
        this.#playerRaisedCards = cards;
    };

    /**
     * Геттер для поднятых игроком карт
     * @returns [{}, {}, ..]
     */
    getPlayerRaisedCards = () => {
        return this.#playerRaisedCards;
    };

    /**
     * Возвращает меньшую карту по сортированной колоде
     * @param {*} cards [{}, {}, ...]
     * @returns object
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

        return results[game.getGamePhase()];
    };

    /**
     * Проверяет "безопасно" ли окружение
     * Например: меньше ли у игрока карт, какая фаза игры и т.п.
     * @returns bool
     */
    isSafeEnvironment = () => {
        const cardsCountCondition = this.#checkByGamePhase() && this.#checkByCardsCount();
        const goodCardsCondition = this.#checkByGoodCards() && this.#checkByGamePhase();

        return cardsCountCondition || goodCardsCondition;
    };

    /**
     * Проверяет является ли карта парой для карт бота
     * @param {*} card {}
     * @returns bool
     */
    isPairForCard = (card) => {
        return this.getCards().filter((botCard) => botCard.power == card.power).length != 0;
    };

    /**
     * Решает атаковать или защищаться
     */
    #botMove = () => {
        const whose_move = localStorage.getItem('whose_move');

        if (whose_move == 'bot') botAttack.attack();

        if (whose_move == 'player') botDefend.defend();

        display.update();

        this.monitorChanges(structuredClone(table.getCards()));
    };

    /**
     * Проверяет бил ли игрок какие-либо масти козырем
     */
    #checkWeakSuits = () => {
        for (const card of table.getCards()) {
            if (!card.isBeaten) continue;

            const isNewSuits = game.getMovesCount() - this.getWeakSuits().atMove >= 4;

            const whoseMoveCondition = localStorage.getItem('whose_move') == 'bot';
            const isDefendCardTrump = card.isBeaten.suit == this.trumpSuit;
            const isBeatenCardNotTrump = card.suit != this.trumpSuit;

            if (whoseMoveCondition && isDefendCardTrump && isBeatenCardNotTrump) {
                this.#setWeakSuits(card, isNewSuits);
            }
        }
    };

    deletePlayerRaisedCard = (card) => {
        const cards = this.getPlayerRaisedCards().filter((playerCard) => {
            return JSON.stringify(playerCard) != JSON.stringify(card);
        });

        this.setPlayerRaisedCards(cards);
    };

    #checkPlayerRaisedCards = () => {
        const cards = table.addDefendCards(Object.assign([], table.getCards()));

        for (const playerCard of this.getPlayerRaisedCards()) {
            for (const tableCard of cards) {
                if (JSON.stringify(playerCard) == JSON.stringify(tableCard)) {
                    console.log('deleted!');
                    this.deletePlayerRaisedCard(playerCard);
                }
            }
        }
    };

    /**
     * Устанавливает масти, битые игроком с помощью козыря
     * @param card {}
     * @param isNewSuits bool
     */
    #setWeakSuits = (card, isNewSuits) => {
        if (isNewSuits) {
            this.getWeakSuits().atMove = game.getMovesCount();
            this.getWeakSuits().suits = [];
        }

        this.getWeakSuits().suits.push(card.suit);
    };

    /**
     * Мониторит изменения стола
     * @param {*} cards [{}, {}, ...]
     */
    monitorChanges = (tableCards) => {
        const timer = setInterval(() => {
            const isTableChanged = JSON.stringify(tableCards) != JSON.stringify(table.getCards());
            const IsBotsMove = localStorage.getItem('whose_move') == 'bot' && table.getCards().length == 0;

            if (isTableChanged) {
                this.#checkPlayerRaisedCards();
                this.#checkWeakSuits();
            }

            if (isTableChanged || IsBotsMove) {
                this.#botMove();

                clearInterval(timer);
                return;
            }
        }, 200);
    };
}
