import { bot, player, deck, display, table, other, fall } from '../start.js';

export default class Game {
    //Количество ходов
    #movesCount = 0;

    /**
     * Возвращает кол-во ходов
     * @returns number
     */
    getMovesCount = () => {
        return this.#movesCount;
    };

    /**
     * Добавляет ход
     */
    #increaseMovesCount = () => {
        this.#movesCount++;
    };

    /**
     * Раздает карты игрокам в начале игры (по одной карте поочередно)
     * @param {*} countToPlayer число карт на игрока / number
     */
    giveCardsToPlayersInit = (countToPlayer) => {
        for (let i = 0; i < countToPlayer * 2; i++) {
            if (i % 2 == 0) {
                bot.addCards(deck.giveCards(1));
                continue;
            }

            player.addCards(deck.giveCards(1));
        }
    };

    /**
     * Раздает карты игрокам после хода(сначала тому кто ходил)
     */
    giveCardsToPlayers = () => {
        const whose_move = localStorage.getItem('whose_move');
        const players = [];

        players[0] = whose_move == 'bot' ? bot : player;
        players[1] = whose_move == 'bot' ? player : bot;

        for (const player of players) {
            if (player.getCards().length < 6) {
                player.addCards(deck.giveCards(6 - player.getCards().length));
            }
        }

        display.update();
    };

    /**
     * Проверяет может ли карта побить другую карту
     * @param {*} cardToDefend {}
     * @param {*} cardToBeat {}
     * @returns bool
     */
    isCardCanBeat = (cardToDefend, cardToBeat) => {
        if (cardToDefend.suit == deck.getTrumpCard().suit) {
            if (cardToBeat.suit == deck.getTrumpCard().suit) {
                if (cardToDefend.power > cardToBeat.power) {
                    return true;
                }
                return false;
            }
            return true;
        }

        if (cardToDefend.suit == cardToBeat.suit && cardToDefend.power > cardToBeat.power) {
            return true;
        }

        return false;
    };

    /**
     * Изменяет ход
     */
    changeWhoseMove = () => {
        let whose_move = localStorage.getItem('whose_move');

        if (whose_move == 'bot') {
            other.notification('Вы атакуете!', 'info');
            localStorage.setItem('whose_move', 'player');
            return;
        }

        other.notification('Бот атакует!', 'info');
        localStorage.setItem('whose_move', 'bot');
    };

    /**
     * Действия при конце хода
     */
    newMoveAction = () => {
        fall.moveToFall(table.giveAllCards());

        this.giveCardsToPlayers();
        this.changeWhoseMove();

        display.update();

        this.#increaseMovesCount();
    };

    /**
     * Действия при атаке игрока
     * @param {*} cardName string
     */
    playerAttack = (cardName) => {
        const chosenCard = player.findCardByName(cardName);

        if (!table.isPossibleToPlaceCardAttack(chosenCard)) return;

        player.addCardToTable(chosenCard);
    };

    /**
     * Действия при защите игрока
     * @param {*} cardName string
     */
    playerDefend = (cardName) => {
        for (const card of player.getCards()) {
            delete card['chosenForAttack'];
        }

        const chosenCard = player.giveCard(player.findCardByName(cardName));

        chosenCard.chosenForAttack = true;

        player.addCard(chosenCard);
    };

    /**
     * Проверяет "хорошая" ли карта
     * Карта "хорошая" если: 1. Ее значение >= 10, 2. Она козырная и ее значение >= 8
     * @param {*} card
     * @returns bool
     */
    isGoodCard = (card) => {
        return card.power >= 10 || (card.suit == this.trumpSuit && card.power >= 8);
    };

    /**
     * Получает фазу игры
     * @returns string
     */
    getGamePhase = () => {
        if (deck.getDeck().length >= 6 && fall.getFall().length <= 15) return '1';

        if (deck.getDeck().length < 6 && fall.getFall().length > 15 && fall.getFall().length <= 32) return '2';

        if (deck.getDeck().length == 0 && fall.getFall().length > 32) return '3';
    };
}
