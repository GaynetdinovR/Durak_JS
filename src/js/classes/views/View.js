import data from '../../data/data.js';

export default class View {
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
    createCardBack(className, parent) {
        return this.createCard(className, parent, `${data.path.CARDS_DIR}/back.png`);
    }

    /**
     * Создает карту
     * @param {*} className string
     * @param {*} parent HTMLElem
     * @param {*} path path to img
     * @param {*} name cardName
     */
    createCard = (className, parent, path, name = 'card', isButton = false) => {
        let elem = isButton ? document.createElement('button') : document.createElement('div');
        const img = document.createElement('img');

        img.src = path;
        img.className = `${className.split(' ')[0]}-img`;
        elem.className = className;
        img.alt = name;

        elem.append(img);

        parent.append(elem);

        return elem;
    };

    /**
     * Создает карту со слушателем
     * @param {*} className string
     * @param {*} parent HTMLElem
     * @param {*} path path to img
     * @param {*} name cardName
     * @param {*} eventListener function
     */
    createCardWithListener = (className, parent, path, name, eventListener = false) => {
        const button = this.createCard(className, parent, path, name, true);

        if (eventListener) {
            button.addEventListener('click', eventListener);
        }

        return button;
    };

    /**
     * Включает или выключает disabled на elem
     * @param {*} elem HTMLElem
     * @param {*} disabled bool
     */
    _isDisableElem = (elem, disabled) => {
        elem.disabled = disabled;
    };

    /**
     * Убирает элемент
     * @param {*} className string
     * @param {*} display flex/block/grid/...
     */
    hide = (className, display) => {
        const elem = document.querySelector('.' + className);

        elem.classList.remove(display);
        elem.classList.add('none');
    };

    /**
     * Показывает элемент
     * @param {*} className string
     * @param {*} display flex/block/grid/...
     */
    show = (className, display) => {
        const elem = document.querySelector('.' + className);

        elem.classList.remove('none');
        elem.classList.add(display);
    };
}
