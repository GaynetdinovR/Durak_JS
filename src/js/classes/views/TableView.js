import { playerTableCardListener } from '../../eventListeners.js';
import { table } from '../../start.js';
import View from './View.js';

export default class TableView extends View {
    //Элемент карт, которые были использованы в атаке
    #tableToBeatHtmlElem = document.querySelector('#game_table-to-beat');
    //Элемент карт, которые были использованы в защите
    #tableToDefendHtmlElem = document.querySelector('#game_table-to-defend');

    /**
     * Обновляет карты на столе
     * @param {*} cards [{}, {}, ...]
     */
    updateTableCards = () => {
        const cards = table.getCards();

        this.clear(this.#tableToBeatHtmlElem);
        this.clear(this.#tableToDefendHtmlElem);

        if (!cards.length) return;

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];

            const classNameToBeat = 'table__card-to-beat';

            if (localStorage.getItem('whose_move') == 'bot' && !card.isBeaten) {
                this.createCardWithListener(classNameToBeat, this.#tableToBeatHtmlElem, card.path, card.name, playerTableCardListener);
                return;
            }

            this.createCard(classNameToBeat, this.#tableToBeatHtmlElem, card.path, card.name);

            if (card.isBeaten) {
                const classNameToDefend = 'table__card-to-defend';
                this.createCard(classNameToDefend, this.#tableToDefendHtmlElem, card.isBeaten.path, card.isBeaten.name);
            }
        }
    };
}
