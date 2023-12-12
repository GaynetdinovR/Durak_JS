import { fall as fallClass } from '../../start.js';
import View from './View.js';

export default class FallView extends View {
    //Элемент бито
    #fallHtmlElem = document.querySelector('#game_fall');
    //Элемент количество карт в бито
    #fallCountHtmlElem = document.querySelector('#game_fall-count');

    /**
     * Возвращает уменьшенное количество карт, которые нужно показать в бито
     * @param {*} cardsCount [{}, {}, ...]
     * @returns number
     */
    #getSmalledCardsCountForFall = (cardsCount) => {
        if (cardsCount.length == 0) return 0;

        return Math.floor(cardsCount.length / 7) + 1;
    };

    /**
     * Обновляет бито относительно количества карт
     * @param {*} fall [{}, {}, ...]
     */
    updateFall = () => {
        const fall = fallClass.getFall();

        const cardsCount = this.#getSmalledCardsCountForFall(fall);

        this.#fallCountHtmlElem.innerHTML = fall.length;

        if (cardsCount == 0) return;

        this.clear(this.#fallHtmlElem);

        for (let i = cardsCount; i > 0; i--) {
            this.createCardBack('fall__card', this.#fallHtmlElem);
        }
    };
}
