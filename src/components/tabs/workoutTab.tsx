import {Tab} from 'tabris';
import Workout from '../workout';

function WorkoutTab(workouts: WorkoutObject) {
  let tab = new Tab({
    title: 'Workout',
    image: 'resources/dumbbell.png',
  });
  tab.append(Workout(workouts));
  return tab;
}

export default WorkoutTab;
