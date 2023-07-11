import path from './data/paths.json'

export default class Deck{

    /**
     * Карты и масти
     */
    #cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
    #suits = ['Club', 'Diamond', 'Heart', 'Spade']

    constructor(){
        this.deck = this.#bundleDeck()
        this.shuffle()
        this.trumpCard = this.#getTrumpCard()
    }


    /**
     * Добавляет джокеров в колоду
     * @param {*} result 
     * @returns 
     */
    #addJockers = (deck) => {
        const jockers = [        
            {
                path: `${paths.paths.CARDS_DIR}/XR.png`, 
                name: 'Red Jocker', 
                color: 'red',
                power: 15
            },
            {
                path: `${paths.paths.CARDS_DIR}/XB.png`,
                name: 'Black Jocker',
                color: 'black',
                power: 15
            }
        ]

        deck.push(jockers[0])
        deck.push(jockers[1])

        return deck
    }


    /**
     * Возвращает путь к изображению карты
     * @param {*} card 
     * @param {*} suit 
     * @returns string
     */
    #getCardPath = (card, suit) => {
        if(card[0] == '1'){
            return `${paths.paths.CARDS_DIR}/${card[0] + card[1] + suit[0]}.png`
        }

        return `${paths.paths.CARDS_DIR}/${card[0] + suit[0]}.png`
    }


    /**
     * Возвращает силу карты
     * @param {*} card 
     * @param {*} suit 
     * @returns string
     */
    #getCardPower = (card) => {
        return (this.#cards.indexOf(card) + 2)
    }


    /**
     * Возвращает цвет карты
     * @param {*} card 
     * @param {*} suit 
     * @returns string
     */
    #getCardColor = (suit) => {
        return (suit[0] == 'C' || suit[0] == 'S') ? 'black' : 'red'
    }


    /**
     * Возвращает название карты
     * @param {*} card 
     * @param {*} suit 
     * @returns string
     */
    #getCardName = (card, suit) => {
        return `${card} ${suit}`
    }


    /**
     * Собирает и возвращает колоду
     * @returns [{}, {}, ...]
     */
    #bundleDeck = () => {

        let deck = []
    
        for(let card of this.#cards){
            for(let suit of this.#suits){
                
                const cardInfo = {
                    path: this.#getCardPath(card, suit),
                    name: this.#getCardName(card, suit),
                    color: this.#getCardColor(suit),
                    power: this.#getCardPower(card)
                }
    
                deck.push(cardInfo)
    
            }        
        }

        deck = this.#addJockers(deck)
        
        return deck
    
    }

    /**
     * Перемешивает колоду
     */
    shuffle = () => {
        this.deck.sort(() => Math.random() - 0.5)
    }

    /**
     * Возвращает козырную карту
     */
    #getTrumpCard = () => {
        let temp = this.deck[0]
        this.deck[0] = this.deck[this.deck.length - 1]
        this.deck[this.deck.length - 1] = temp

        return temp
    }

}