import { deck as deckClass } from '../../start.js';
import View from './View.js';

export default class DeckView extends View {
    //Элемент колоды
    #deckHtmlElem = document.querySelector('#game_deck');
    //Элемент количества карт в колоде
    #deckCountHtmlElem = document.querySelector('#game_deck-count');

    /**
     * Возвращает уменьшенное количество карт, которые нужно показать в колоде
     * @param {*} cardsCount [{}, {}, ...]
     * @returns number
     */
    #getSmalledCardsCountForDeck = (cardsCount) => {
        if (cardsCount.length == 52) return 7;

        if (cardsCount.length == 1) return 0;

        if (cardsCount.length > 1 && cardsCount.length < 7) return 1;
        if (Math.floor(cardsCount.length / 7) == 7) return 6;

        return Math.floor(cardsCount.length / 7);
    };

    /**
     * Обновляет колоду относительно количества карт
     * @param {*} deck [{}, {}, ...]
     * @param {*} trumpCard {}
     * @param {*} isCreated bool
     */
    updateDeck = () => {
        const trumpCard = deckClass.getTrumpCard();
        const deck = deckClass.getDeck();

        this.clear(this.#deckHtmlElem);

        for (let i = this.#getSmalledCardsCountForDeck(deck); i > 0; i--) {
            this.createCardBack('deck__card', this.#deckHtmlElem);
        }

        const className = 'deck__trump-card';
        this.createCard(className, this.#deckHtmlElem, trumpCard.path);

        if (deck.length == 0) {
            document.querySelector('.deck__trump-card').style.opacity = '0.5';
        }

        this.#deckCountHtmlElem.innerHTML = deck.length;
    };
}
