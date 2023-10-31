import View from '../Views/View.js';

export default class Animation extends View{

	// HTMLElem
	_displayHtmlElem = document.querySelector('.display');

	// Центр колоды игрока
	_playerCenter = {x: 750, y: 442};

	// Центр колоды бота
	_botCenter = {x: 750, y: 15};

	/**
	 * Форматирует объект координат из transform свойства
	 * @param {*} transform transform (css)
	 * @returns object {x: number, y: number} (px)
	 */
	#formatOldPlace = (transform) => {
		const temp = {
			x: parseInt(transform.split(',')[4]),
			y: parseInt(transform.split(',')[5]),
		};

		return temp;
	};

	/**
	 * Собирает transform свойство из объекта
	 * @param {*} transform transform (css)
	 * @param {*} place {x: number, y: number} (px)
	 * @returns string transform (css)
	 */
	#configureTransform = (transform, place) => {
		transform = transform.split(',');

		transform[4] = place.x;
		transform[5] = place.y + ')';

		return transform.join(',');
	};

	/**
	 * Шаблон анимации перемещения с точки А в точку Б
	 * @param {*} elem HTMLElem
	 * @param {*} animationTime number (ms)
	 * @param {*} newPlace {x: number, y: number} (px)
	 * @param {*} oldPlace {x: number, y: number} (px)
	 */
	_moveAnimation = (elem, animationTime, newPlace, oldPlace) => {
		const elemTransform = window.getComputedStyle(elem).transform;

		oldPlace = (!oldPlace) ? this.#formatOldPlace(elemTransform) : oldPlace;

		const start = Date.now();
		const stepX = ((newPlace.x - oldPlace.x) / animationTime) * 5;
		const stepY = ((newPlace.y - oldPlace.y) / animationTime) * 5;

		const timer = setInterval(() => {
			const timePassed = Date.now() - start;

			if(timePassed >= animationTime){
				clearInterval(timer);
				return;
			}

			const newAnimationPlace = {
				x: Math.round(oldPlace.x + stepX * (timePassed / 5)),
				y: Math.round(oldPlace.y + stepY * (timePassed / 5)),
			};

			elem.style.transform = this.#configureTransform(elemTransform, newAnimationPlace);

		}, 5);

	};


}