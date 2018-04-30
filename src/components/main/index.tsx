import {Page} from 'tabris';
import Tabs from '../tabs';
import NavigationView from "../navigation";

function main() {

  NavigationView.toolbarVisible = true;

  const Main = new Page( {
    title: 'Workouts'
  }).on({
    appear: () => {
      Main.append(Tabs(JSON.parse(localStorage.getItem('workout_types'))))
    }
  });

  return Main;
}

export default main;
