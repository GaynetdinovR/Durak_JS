import DeckView from './DeckView';
import FallView from './FallView';
import PlayerView from './PlayerView';
import BotView from './BotVIew';
import TableView from './TableView';
import View from './View';

const botView = new BotView();
const fallView = new FallView();
const playerView = new PlayerView();
const deckView = new DeckView();
const tableView = new TableView();
const view = new View();

export { botView, playerView, deckView, fallView, tableView, view };
