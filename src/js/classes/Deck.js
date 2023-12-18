import data from '../data/data.js';

export default class Deck {
    // Колода
    #deck = [];
    //Козырная карта
    #trumpCard;

    constructor() {
        this.#initialize();
    }

    /**
     * Геттер для колоды
     */
    getDeck = () => {
        return this.#deck;
    };

    /**
     * Геттре для козырной карты
     */
    getTrumpCard = () => {
        return this.#trumpCard;
    };

    /**
     * Инициализирует необходимые данные
     */
    #initialize = () => {
        this.#bundleDeck();
        this.#shuffle();
        this.#setTrumpCard();
    };

    /**
     * Возвращает путь к изображению карты
     * @param {*} card string
     * @param {*} suit string
     * @returns string
     */
    #getCardPath = (card, suit) => {
        if (card[0] == '1') {
            return `${data.path.CARDS_DIR}/${card[0] + card[1] + suit[0]}.png`;
        }

        return `${data.path.CARDS_DIR}/${card[0] + suit[0]}.png`;
    };

    /**
     * Возвращает силу карты
     * @param {*} card string
     * @param {*} suit string
     * @returns string
     */
    #getCardPower = (card) => {
        return data.cards.indexOf(card) + 2;
    };

    /**
     * Возвращает название карты
     * @param {*} card string
     * @param {*} suit string
     * @returns string
     */
    #getCardName = (card, suit) => {
        return `${card} ${suit}`;
    };

    /**
     * Собирает колоду
     */
    #bundleDeck = () => {
        for (let card of data.cards) {
            for (let suit of data.suits) {
                const cardInfo = {
                    path: this.#getCardPath(card, suit),
                    name: this.#getCardName(card, suit),
                    power: this.#getCardPower(card),
                    suit: suit,
                };

                this.getDeck().push(cardInfo);
            }
        }
    };

    /**
     * Перемешивает колоду
     */
    #shuffle = () => {
        this.getDeck().sort(() => Math.random() - 0.5);
    };

    /**
     * Выбирает козырную карту
     */
    #setTrumpCard = () => {
        this.#trumpCard = this.getDeck()[this.getDeck().length - 1];
    };

    /**
     * Передает карты, убирая их из колоды
     * @param {*} count numbers
     * @returns
     */
    giveCards = (count) => {
        return this.getDeck().splice(0, count);
    };
}
