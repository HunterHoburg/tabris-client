import {ui, TextView, CollectionView, Composite} from 'tabris';
import NavigationView from './components/navigation';
import MainPage from './components/main';
import SplashPage from './components/splash';
import SettingsPage from './components/settings';
import AddWorkoutTypePage from './components/addWorkoutType';

const pages = [{title: 'Workouts', target: MainPage}, {title: 'Add Workout', target: AddWorkoutTypePage}, {title: 'Settings', target: SettingsPage}];
const drawer = ui.drawer;

new CollectionView({
  left: 0,
  top: 'prev()',
  right: 0,
  bottom: 0,
  cellHeight: 40,
  itemCount: pages.length,
  createCell: createCell,
  updateCell: updateCell,
}).on({
  select: ({index}) => {
    drawer.close();
    NavigationView.pages().dispose();
    NavigationView.append(pages[index].target())
  }
}).appendTo(drawer);

function createCell() {
  let cell = new Composite();
  new TextView({
    left: 0,
    centerY: 0,
  }).appendTo(cell);
  return cell;
}

function updateCell(cell: any, index: number) {
  cell.apply({
    TextView: {text: pages[index].title}
  })
}

drawer.enabled = true;

NavigationView.append(SplashPage());

