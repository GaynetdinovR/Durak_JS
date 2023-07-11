import paths from './data/paths.json'

export default class Display{

    #deckHtmlElem = document.querySelector('#game_deck')

    /**
     * Очищает колоду (HTML)
     */
    #clearDeck = () => {
        this.#deckHtmlElem.innerHTML = ''
    }


    /**
     * Создает карту в колоде (HTML)
     * @param {*} back 
     * @param {*} path 
     */
    #createCardToDeck(isTrump = false, path){
        let div = document.createElement('div')
        let img = document.createElement('img')

        if(!isTrump){
            img.src = `${paths.paths.CARDS_DIR}/back.png`
            img.className = 'display__deck-card-img'
            div.className = 'display__deck-card'
            img.alt = 'backside'
        } else {
            img.src = path
            img.className = 'display__deck-trump-card-img'
            div.className = 'display__deck-trump-card'
            img.alt = 'trump-card'
        }

        div.append(img)

        this.#deckHtmlElem.append(div)
    }

    /**
     * Обновляет колоду относительно количества карт
     * @param {*} deck 
     * @param {*} trumpCard 
     */
    updateDeck = (isCreated = false, deck, trumpCard) => {

        this.#clearDeck()
        
        let cardsCount = Math.floor(deck.length / 7)

        while(cardsCount > 0){
            this.#createCardToDeck()
            cardsCount--
        }

        if(!isCreated){
            this.#createCardToDeck(true, trumpCard['path'])
        }

    }

}