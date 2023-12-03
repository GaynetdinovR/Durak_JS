export default class Fall {
    // Бито
    #fall = [];

    /**
     * Геттер для бито
     */
    getFall = () => {
        return this.#fall;
    };

    /**
     * Перемещает карту в бито
     * @param {*} cards [{}, {}]
     */
    moveToFall = (cards) => {
        this.getFall().push(...cards);
    };
}
