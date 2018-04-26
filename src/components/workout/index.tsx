import {Button, Composite} from 'tabris';
import NavigationView from '../navigation';
import AddWorkoutTypePage from '../addWorkoutType';
import WorkoutInput from '../workoutInput';

function workout(workoutObject: WorkoutObject) {

  const workoutView = new Composite({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  workoutView.append(WorkoutInput(workoutObject))
    .append(new Button({
    cornerRadius: 10,
    text: 'Add Workout',
    width: 75,
    bottom: 10,
    right: 10
  }).on({
    select: () => {
      NavigationView.pages().dispose();
      NavigationView.append(AddWorkoutTypePage());
    }
  }));

  return workoutView
}

export default workout;
