import data from './../data/data.json';

export default class View{

	clear = (elem) => {
		elem.innerHTML = '';
	};

	createCardBack(className, parent){
		this.createCard(className, parent, `${data.path.CARDS_DIR}/back.png`);
	}

	createCard(className, parent, path){
		let div = document.createElement('div');
		let img = document.createElement('img');

		img.src = path;
		img.className = `${className}-img`;
		div.className = className;
		img.alt = 'card';

		div.append(img);

		parent.append(div);
	}

}