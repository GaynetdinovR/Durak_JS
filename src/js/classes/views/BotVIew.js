import { bot } from '../../start.js';
import View from './View.js';

export default class BotView extends View {
    //Элемент карт бота
    #botHtmlElem = document.querySelector('#game_bot');

    /**
     * Обновляет карты бота
     * @param {*} cards [{}, {}, ...]
     */
    updateBotCards = () => {
        const cards = bot.getCards();

        this.clear(this.#botHtmlElem);

        if (cards.length == 0) return;

        for (let i = 0; i < cards.length; i++) {
            const className = 'bot__card';

            this.createCardBack(className, this.#botHtmlElem);
        }

        const lastCard = document.querySelector('.bot__card:last-child');
        lastCard.classList.add('bot__last-card');
    };
}
