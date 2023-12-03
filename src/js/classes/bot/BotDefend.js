import { bot, display, game, other, table } from '../../start.js';
import data from '../../data/data.json';

export default class BotDefend {
    /**
     * Проверяет проходит ли карты по "рациональному условию"
     * @param {*} cardToDefend {}
     * @param {*} cardToBeat {}
     * @returns bool
     */
    #isRationalCondition = (cardToDefend, cardToBeat) => {
        if (bot.isPairForCard(cardToBeat)) return false;

        if (bot.isGoodCard(cardToBeat)) return false;

        if (bot.isGoodCard(cardToDefend)) return false;

        return true;
    };

    /**
     * Проверяет рационально ли бить карту (для продвинутого ИИ)
     * Например: если карта мелкая, а карты для защиты крупные, то не рационально, и т.п.
     * @param {*} cardsToDefend {}
     * @param {*} cardToBeat {}
     * @returns bool
     */
    #isRationalToBeatCard = (cardsToDefend, cardToBeat) => {
        const results = [];

        for (const cardToDefend of cardsToDefend) {
            results.push(this.#isRationalCondition(cardToDefend, cardToBeat));
        }

        return !results.every((item) => item == false);
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
     * Защита для легкого уровня ИИ
     * @param {*} cardsToDefend
     * @returns
     */
    #easyModeDefend = (cardsToDefend) => {
        if (cardsToDefend.length == 0) {
            bot.getAllCardsFromTable();

            display.isPlayerMoveToFallBtnDisabled(true);

            return;
        }

        const card = other.getRandomArrayElem(cardsToDefend);

        bot.beatCard(card);
    };

    /**
     * Нормальный уровень защиты
     * @param {*} cardsToDefend [{}, {}, ...]
     */
    #normalModeDefend = (cardsToDefend) => {
        if (cardsToDefend.length == 0) {
            bot.getAllCardsFromTable();

            display.isPlayerMoveToFallBtnDisabled(true);

            return;
        }

        const card = bot.getSmallestCard(cardsToDefend);

        bot.beatCard(card);
    };

    /**
     * Общий метод защиты
     */
    defend = () => {
        console.log('defend GO!');

        const cardToBeat = table.findCardToBeat();
        const cardsToDefend = this.#findCardsToDefend(cardToBeat);

        const defendMode = {
            easy: () => this.#easyModeDefend(cardsToDefend),
            normal: () => this.#normalModeDefend(cardsToDefend),
            hard: () => {},
            extreme: () => {},
        };

        defendMode[data.mode]();
    };
}

const botDefend = new BotDefend();

export { botDefend };
