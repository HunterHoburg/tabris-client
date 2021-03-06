import {Button, Composite, ScrollView} from 'tabris';
import NavigationView from '../navigation';
import AddWorkoutTypePage from '../addWorkoutType';
import WorkoutList from '../workoutList/index';

function workout(workoutObject: WorkoutObject) {

  const workoutView = new ScrollView({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    direction: 'vertical'
  });

  workoutView.append(WorkoutList(workoutObject))
    .append(new Button({
    text: 'Add Workout',
    bottom: 10,
    right: 10,
    left: 10,
    background: '#2b77db',
    textColor: 'white'
  }).on({
    select: () => {
      NavigationView.pages().dispose();
      NavigationView.append(AddWorkoutTypePage());
    }
  }));

  return workoutView;
}

export default workout;
