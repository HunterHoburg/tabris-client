import {Page} from 'tabris';
import Tabs from '../tabs';

function main() {

  let workouts;

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
