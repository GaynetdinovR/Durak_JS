import { bot } from '../../start.js';
import View from './View.js';

export default class BotView extends View {
    //Элемент карт бота
    #botHtmlElem = document.querySelector('#game_bot');

    #formatCardClassName = (card, cards) => {
        const lastCardClassName = card == cards[cards.length - 1] ? ' bot__last-card' : '';

        return 'bot__card' + lastCardClassName;
    };

    /**
     * Обновляет карты бота
     * @param {*} cards [{}, {}, ...]
     */
    updateBotCards = () => {
        const cards = bot.getCards();

        this.clear(this.#botHtmlElem);

        if (cards.length == 0) return;

        for (const card of cards) {
            const className = this.#formatCardClassName(card, cards);

            this.createCardBack(className, this.#botHtmlElem);
        }
    };
}
