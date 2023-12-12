import { bot, game, table } from '../start';

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
    raiseTableCards = () => {
        const cards = table.giveAllCards();

        for (const card of cards) {
            delete card['isBeaten'];

            this.addCard(card);
        }

        if (localStorage.getItem('whose_move') == 'bot') bot.addPlayerRaisedCards(cards);

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

    /**
     * Отдает карту на стол
     * @param {*} card
     */
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
     * Возвращает отсортированные карты ( Сначала козырные по убыванию, затем остальные по убыванию )
     * @param {*} cards [{}, {}, ...]
     * @returns [{}, {}, ...]
     */
    _getSortedCards = (cards) => {
        cards.sort((a, b) => b.power - a.power);

        const trumpCards = cards.filter((card) => card.suit == this.trumpSuit);
        const notTrumpCards = cards.filter((card) => card.suit != this.trumpSuit);

        return [...trumpCards, ...notTrumpCards];
    };
}
