import data from './../data/data.json';

export default class View{

	/**
	 * Очищает HTML элемент
	 * @param {*} elem HTMLElem
	 */
	clear = (elem) => {
		elem.innerHTML = '';
	};


	/**
	 * Создает заднюю часть карты
	 * @param {*} className string
	 * @param {*} parent HTMLElem
	 */
	createCardBack(className, parent){
		return this.createCard(className, parent, `${data.path.CARDS_DIR}/back.png`);
	}
	

	/**
	 * Создает карту 
	 * @param {*} className string
	 * @param {*} parent HTMLElem
	 * @param {*} path path to img
	 * @param {*} name cardName
	 */
	createCard(className, parent, path, name = 'card'){
		let div = document.createElement('div');
		let img = document.createElement('img');

		img.src = path;
		img.className = `${className}-img`;
		div.className = className;
		img.alt = name;

		div.append(img);

		parent.append(div);

		return div;

	}

	/**
	 * Создает карту со слушателем
	 * @param {*} className string
	 * @param {*} parent HTMLElem
	 * @param {*} path path to img
	 * @param {*} name cardName
	 * @param {*} eventListener function
	 */
	createCardWithListener(className, parent, path, name, eventListener = false){

		const div = this.createCard(className, parent, path, name);

		if(eventListener){ div.addEventListener('click', eventListener); }

		return div;

	}

}