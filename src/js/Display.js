import data from './data/path.json'

export default class Display{

    #deckHtmlElem = document.querySelector('#game_deck')
    #fallHtmlElem = document.querySelector('#game_fall')

    /**
     * Очищает колоду (HTML)
     */
    #clearDeck = () => {
        this.#deckHtmlElem.innerHTML = ''
    }

    /**
     * Очищает бито (HTML)
     */
    #clearFall = () => {
        this.#fallHtmlElem.innerHTML = ''
    }

    /**
     * Возвращает количество карт, которые нужно показать в колоде
     * @param {*} deck 
     * @returns 
     */
    #getCardsCount = (deck) => {

        if(deck.length > 0 && deck.length < 7){ return 1 } 

        if(deck.length == 54){ return 7 }

        if(Math.floor(deck.length / 7) == 7){ return 6 }

        return Math.floor(deck.length / 7)
        
    }

    /**
     * Создает карту в колоде (HTML)
     * @param {*} path 
     * @param {*} isTrump 
     */
    #createCardToDeck = (path, isTrump = false) => {

        if(!isTrump){
            path = `${data.path.CARDS_DIR}/back.png`
            const className = 'display__deck-card-img'

            this.#createCard(className, path, this.#deckHtmlElem)
        } else {
            const className = 'display__deck-trump-card-img'

            this.#createCard(className, path, this.#deckHtmlElem)
        }

    }

    /**
     * Создает карту в бито (HTML)
     * @param {*} path 
     * @param {*} isTrump 
     */
    #createCardToFall = () => {

        const path = `${data.path.CARDS_DIR}/back.png`
        const className = 'display__fall-card-img'

        this.#createCard(className, path, this.#fallHtmlElem)

    }


    /**
     * Создает карту (HTML)
     * @param {*} className string (some__some-card-img)
     * @param {*} path path to img
     * @param {*} parent HTMLElement
     */
    #createCard(className, path, parent){
        let div = document.createElement('div')
        let img = document.createElement('img')

        img.src = path
        img.className = className
        div.className = className.split('-').toSpliced(-1, 1).join('-')
        img.alt = 'card'

        div.append(img)

        parent.append(div)
    }

    /**
     * Обновляет колоду относительно количества карт
     * @param {*} deck 
     * @param {*} trumpCard 
     */
    updateDeck = (deck, trumpCard, isCreated = false) => {

        this.#clearDeck()

        let cardsCount = this.#getCardsCount(deck)

        while(cardsCount > 0){
            this.#createCardToDeck()
            cardsCount--
        }

        if(!isCreated){
            this.#createCardToDeck(trumpCard['path'], true)
        }

    }

    /**
     * Обновляет бито относительно количества карт
     * @param {*} fall 
     */
    updateFall = (fall) => {

        let cardsCount = this.#getCardsCount(fall)

        if(cardsCount == 0){ return }

        this.#clearFall()

        while(cardsCount > 0){
            this.#createCardToFall()
            cardsCount--
        }

    }

}