import { game } from '../start';

export default class Table {
    #cards = [];

    /**
     * Геттер для карт стола
     * @returns [{}, {}, ...]
     */
    getCards = () => {
        return this.#cards;
    };

    /**
     * Сеттер для карт стола
     * @param {*} cards [{}, {}, ...]
     */
    setCards = (cards) => {
        this.#cards = cards;
    };

    /**
     * Добавляет карту столу
     * @param {*} card {}
     */
    addCard = (card) => {
        card.isBeaten = false;

        this.getCards().push(card);
    };

    /**
     * "Отдает" все карты со стола
     * @returns  [{}, {}, ...]
     */
    giveAllCards = () => {
        const cards = Object.assign([], this.getCards());

        for (const card of cards) {
            if (!card.isBeaten) continue;

            cards.push(card.isBeaten);
        }

        this.setCards([]);

        return cards;
    };

    /**
     * Находит карту, которую нужно побить
     * @returns {}
     */
    findCardToBeat = () => {
        for (let card of this.getCards()) {
            if (card.isBeaten) continue;

            return card;
        }
    };

    /**
     * "Бьет" карту на столе
     * @param {*} cardToDefend {}
     */
    beatCard = (cardToDefend) => {
        this.findCardToBeat().isBeaten = cardToDefend;
    };

    /**
     * Возвращает массив сил карт стола
     * @returns [number, number, ...]
     */
    #getTableCardsPowers = () => {
        const result = [];

        for (const tableCard of this.getCards()) {
            result.push(tableCard.power);

            if (tableCard.isBeaten) {
                result.push(tableCard.isBeaten.power);
            }
        }

        return result;
    };

    /**
     * Проверяет возможно ли положить карту на стол при атаке
     * @returns bool
     */
    isPossibleToPlaceCardAttack = (card) => {
        if (this.getCards().length >= 6) return false;

        if (!this.#getTableCardsPowers().includes(card.power) && this.getCards().length) return false;

        return true;
    };

    /**
     * Проверяет возможно ли положить карту на стол при защите
     * @returns bool
     */
    isPossibleToPlaceCardDefend = (card) => {
        if (this.findCardToBeat()) {
            return game.isCardCanBeat(card, this.findCardToBeat());
        }

        return false;
    };
}
