import DeckView from './DeckView';
import FallView from './FallView';
import PlayerView from './PlayerView';
import BotView from './BotVIew';
import TableView from './TableView';

const botView = new BotView();
const fallView = new FallView();
const playerView = new PlayerView();
const deckView = new DeckView();
const tableView = new TableView();

export { botView, playerView, deckView, fallView, tableView };
