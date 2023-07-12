import Deck from './Deck.js'
import Display from './Display.js'

const deck = new Deck()
const display = new Display()

display.updateDeck(deck.deck, deck.trumpCard)
display.updateFall(deck.fall, true)