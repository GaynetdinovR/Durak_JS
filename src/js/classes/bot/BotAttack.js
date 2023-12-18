import data from '../../data/data.js';
import { bot, display, game, other, table } from '../../start';

export default class BotAttack {
    /**
     * Находит карты для атаки
     */
    #findCardsToAttack = () => {
        const cardsToAttack = [];

        for (const card of bot.getCards()) {
            if (table.isPossibleToPlaceCardAttack(card)) {
                cardsToAttack.push(card);
            }
        }

        return cardsToAttack;
    };

    /**
     * Самый легкий уровень атаки
     * @param cardsToAttack [{}, {}, ...]
     */
    #stupidModeAttack = (cardsToAttack) => {
        bot.addCardToTable(other.getRandomArrayElem(cardsToAttack));
    };

    /**
     * Легкий уровень атаки
     * @param cardsToAttack [{}, {}, ...]
     */
    #easyModeAttack = (cardsToAttack) => {
        bot.addCardToTable(bot.getSmallestCard(cardsToAttack));
    };

    /**
     * Нормальный уровень атаки
     * @param {*} cardsToAttack [{}, {}, ...]
     */
    #normalModeAttack = (cardsToAttack) => {
        return cardsToAttack;
    };

    /**
     * Выбирает метод атаки относительно уровня ИИ
     * @param {*} cardsToAttack [{}, {}, ...]
     */
    #modeAction = (cardsToAttack) => {
        const attackMode = {
            stupid: () => this.#stupidModeAttack(cardsToAttack),
            easy: () => this.#easyModeAttack(cardsToAttack),
            normal: () => this.#normalModeAttack(cardsToAttack),
            hard: () => {},
            extreme: () => {},
        };

        attackMode[data.mode]();
    };

    /**
     * Общий метод атаки
     */
    attack = () => {
        if (bot.getCards().length == 0) return;

        const cardsToAttack = this.#findCardsToAttack();

        if (cardsToAttack.length == 0) {
            display.isPlayerRaiseBtnDisabled(true);
            game.newMoveAction();
            return;
        }

        display.isPlayerRaiseBtnDisabled(false);
        this.#modeAction(cardsToAttack);
    };
}

const botAttack = new BotAttack();

export { botAttack };
