import {Tab} from 'tabris';
import Workout from '../workout';

function WorkoutTab(workouts: WorkoutObject) {
  const tab = new Tab({
    title: 'Workout'
  });
  tab.append(Workout(workouts));
  return tab;
}

export default WorkoutTab;
