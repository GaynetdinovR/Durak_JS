import DeckView from './DeckView';
import FallView from './FallView';
import PlayerView from './PlayerView';
import BotView from './BotVIew';

const botView = new BotView;
const fallView = new FallView;
const playerView = new PlayerView;
const deckView = new DeckView;

export {
	botView,
	playerView,
	deckView,
	fallView,
};