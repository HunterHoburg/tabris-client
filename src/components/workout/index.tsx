import {Button, Composite, ScrollView} from 'tabris';
import NavigationView from '../navigation';
import AddWorkoutTypePage from '../addWorkoutType';
import WorkoutInput from '../workoutInput';

function workout(workoutObject: WorkoutObject) {

  const workoutView = new ScrollView({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    direction: 'vertical'
  });

  workoutView.append(WorkoutInput(workoutObject))
    .append(new Button({
    text: 'Add Workout',
    bottom: 10,
    right: 10
  }).on({
    select: () => {
      NavigationView.pages().dispose();
      NavigationView.append(AddWorkoutTypePage());
    }
  }));

  return workoutView;
}

export default workout;
