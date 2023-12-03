import data from '../../data/data.json';
import { bot, display, game, other, table } from '../../start';

export default class BotAttack {
    /**
     * Легкий уровень атаки
     */
    #easyModeAttack = () => {
        const cardsToAttack = [];

        for (const card of bot.getCards()) {
            if (table.isPossibleToPlaceCardAttack(card)) {
                cardsToAttack.push(card);
            }
        }

        if (cardsToAttack.length != 0) {
            display.isPlayerGetAllCardsBtnDisabled(false);

            bot.addCardToTable(other.getRandomArrayElem(cardsToAttack));

            return;
        }

        game.newMoveAction();

        display.isPlayerGetAllCardsBtnDisabled(true);
    };

    /**
     * Нормальный уровень атаки
     */
    #normalModeAttack = () => {
        const cardToAttack = bot.getSmallestCard(bot.getCards());

        bot.addCardToTable(cardToAttack);
    };

    /**
     * Общий метод атаки
     */
    attack = () => {
        console.log('attack GO!');

        if (bot.getCards().length == 0) return;

        const attackMode = {
            easy: () => this.#easyModeAttack(),
            normal: () => this.#normalModeAttack(),
            hard: () => {},
            extreme: () => {},
        };

        attackMode[data.mode]();
    };
}

const botAttack = new BotAttack();

export { botAttack };
