import { game, table } from '../start';

export default class Player {
    //Карты
    #cards = [];
    //Козырная масть
    trumpSuit;

    constructor(cards, trumpSuit) {
        this.trumpSuit = trumpSuit;
        this.setCards(this._getSortedCards(cards));
    }

    /**
     * Геттер для карт игрока
     * @returns [{}, {}, ...]
     */
    getCards = () => {
        return this.#cards;
    };

    /**
     * Сеттер для карт игрока
     * @param {*} cards
     */
    setCards = (cards) => {
        this.#cards = cards;
    };

    /**
     * Забирает в руку игрока все карты со стола
     */
    getAllCardsFromTable = () => {
        const cards = table.giveAllCards();

        for (const card of cards) {
            delete card['isBeaten'];

            this.addCard(card);
        }

        game.giveCardsToPlayers();
    };

    /**
     * Добавляет несколько карт
     * @param {*} card object {}
     */
    addCards = (cards) => {
        for (const card of cards) {
            this.addCard(card);
        }
    };

    /**
     * Добавляет карту
     * @param {*} card object {}
     */
    addCard = (card) => {
        this.setCards(this._getSortedCards([...this.getCards(), card]));
    };

    /**
     * "Отдает" карту по имени
     * @param {*} cardName string
     * @returns object {}
     */
    giveCard = (card) => {
        this._deleteCard(card);

        return card;
    };

    /**
     * Бьет карту на столе
     * @param {*} card {}
     */
    beatCard = (card) => {
        table.beatCard(this.giveCard(card));
    };

    addCardToTable = (card) => {
        table.addCard(this.giveCard(card));
    };

    /**
     * Возвращает карту по имени
     * @param {*} name string
     * @returns object {}
     */
    findCardByName = (name) => {
        return this.getCards().filter((card) => card.name === name)[0];
    };

    /**
     * Удаляет карту по имени
     * @param {*} card {}
     */
    _deleteCard = (card) => {
        this.setCards(this.getCards().filter((playerCard) => playerCard.name != card.name));
    };

    /**
     * Сортирует карты игрока ( Сначала козырные по убыванию, затем остальные по убыванию )
     * @param {*} cards [{}, {}, ...]
     * @returns [{}, {}, ...]
     */
    _getSortedCards = (cards) => {
        const compare = (a, b) => {
            if (a.power > b.power) return -1;
            if (a.power == b.power) return 0;
            if (a.power < b.power) return 1;
        };

        cards.sort(compare);

        const trumpCards = cards.filter((card) => card.suit == this.trumpSuit);
        const notTrumpCards = cards.filter((card) => card.suit != this.trumpSuit && card.suit != 'Jocker');

        return [...trumpCards, ...notTrumpCards];
    };
}
