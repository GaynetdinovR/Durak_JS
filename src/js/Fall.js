export default class Fall{
	
	// Бито
	fall = [];

	/**
     * Перемещает карту в бито
     * @param {*} cards [{}, {}]
     */
	moveToFall = (cards) => {
		this.fall.push(...cards);
	}; 

}