import { bot, display, game, other, table } from '../../start.js';
import data from '../../data/data.js';

export default class BotDefend {
    /**
     * Проверяет проходят ли карты по "рациональному условию"
     * @param {*} cardToDefend {}
     * @param {*} cardToBeat {}
     * @returns bool
     */
    #isRationalCondition = (cardToDefend, cardToBeat) => {
        if (bot.isPairForCard(cardToBeat)) return true;

        if (game.isGoodCard(cardToBeat)) return true;

        if (game.isGoodCard(cardToDefend)) return true;

        return false;
    };

    /**
     * Проверяет рационально ли поднять карту (для продвинутого ИИ)
     * Например: если карта мелкая, а карты для защиты крупные, то рационально, и т.п.
     * @param {*} cardsToDefend {}
     * @param {*} cardToBeat {}
     * @returns bool
     */
    #isRationalToRaiseCard = (cardsToDefend, cardToBeat) => {
        const results = [];

        for (const cardToDefend of cardsToDefend) {
            results.push(this.#isRationalCondition(cardToDefend, cardToBeat));
        }

        return results.includes(true);
    };

    /**
     * Находит в руке бота все карты, которые могут побить атакующую карту
     * @param {*} cardToBeat {}
     * @returns [{}, {}, ...]
     */
    #findCardsToDefend = (cardToBeat) => {
        const cardsToDefend = [];

        for (let botCard of bot.getCards()) {
            if (game.isCardCanBeat(botCard, cardToBeat)) {
                cardsToDefend.push(botCard);
            }
        }

        return cardsToDefend;
    };

    /**
     * Самый легкий уровень защиты
     * @param {*} cardsToDefend
     */
    #stupidModeDefend = (cardsToDefend) => {
        bot.beatCard(other.getRandomArrayElem(cardsToDefend));
    };

    /**
     * Легкий уровень защиты
     * @param {*} cardsToDefend [{}, {}, ...]
     */
    #easyModeDefend = (cardsToDefend) => {
        bot.beatCard(bot.getSmallestCard(cardsToDefend));
    };

    /**
     * Нормальный уровень защиты
     * @param {*} cardsToDefend [{}, {}, ...]
     */
    #normalModeDefend = (cardsToDefend) => {
        return cardsToDefend;
    };

    /**
     * Выбирает метод защиты относительно уровня ИИ
     * @param {*} cardsToDefend [{}, {}, ...]
     */
    #modeAction = (cardsToDefend) => {
        const defendMode = {
            stupid: () => this.#stupidModeDefend(cardsToDefend),
            easy: () => this.#easyModeDefend(cardsToDefend),
            normal: () => this.#normalModeDefend(cardsToDefend),
            hard: () => {},
            extreme: () => {},
        };

        defendMode[data.mode]();
    };

    /**
     * Общий метод защиты
     */
    defend = () => {
        const cardsToDefend = this.#findCardsToDefend(table.findCardToBeat());

        if (cardsToDefend.length != 0) {
            this.#modeAction(cardsToDefend);
            return;
        }

        display.isPlayerMoveToFallBtnDisabled(true);
        bot.raiseTableCards();
    };
}

const botDefend = new BotDefend();

export { botDefend };
