import {Tab} from 'tabris';
import History from '../history';

function HistoryTab() {
  const tab = new Tab({
    title: 'History',
    image: 'resources/list.png'
  });
  tab.append(History());
  return tab;
}

export default HistoryTab;
