import {Button, Composite, TextView} from 'tabris';
import NavigationView from "./navigation";
import LogWorkoutPage from "./logWorkout";

function WorkoutInput(workoutObject: WorkoutObject) {

  console.log(workoutObject);
  const container = new Composite({
    top: 0,
    left: 0,
    right: 0,
  });

  function workoutTitle(title: string) {
    return new TextView({
      text: title,
      top: 'prev() 20',
      left: 10,
    })
  }

  function addWorkoutButton(workout: {type: string, title: string, id: number}) {
    return new Button({
      text: 'Log',
      top: 'prev() -25',
      right: 10,
      alignment: 'right'
    }).on({
      select: () => {
        NavigationView.pages().dispose();
        NavigationView.append(LogWorkoutPage(workout));
      }
    })
  }

  for (let i = 0; i < workoutObject.workouts.length; i++) {
    console.log(workoutObject.workouts[i].title);
    container.append(workoutTitle(workoutObject.workouts[i].title))
      .append(addWorkoutButton(workoutObject.workouts[i]))
  }
  return container;
}

export default WorkoutInput;
