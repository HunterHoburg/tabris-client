import {Button, Composite, TextView, RefreshComposite} from 'tabris';
import NavigationView from "./navigation";
import LogWorkoutPage from "./logWorkout";
import WorkoutOptionsPage from './workoutOptions';
import {API} from "../constants";

function WorkoutInput(workoutObject: WorkoutObject) {

  const container = new RefreshComposite({
    top: 0,
    left: 0,
    right: 0,
  }).on({
    refresh: () => {
      fetch(API + '/workout/load', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then(function(res) {
        res.json().then(function(js) {
          localStorage.setItem('workout_types', JSON.stringify(js));
          makePage(js);
          container.refreshIndicator = false;
        })
      })
    }
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
      baseline: 'prev()',
      right: 'prev() 10',
    }).on({
      select: () => {
        NavigationView.pages().dispose();
        NavigationView.append(LogWorkoutPage(workout));
      }
    })
  }

  function workoutOptionsButton(workout: Workout) {
    return new Button({
      text: 'Options',
      baseline: 'prev()',
      right: 10,
    }).on({
      select: () => {
        // NavigationView.pages().dispose();
        NavigationView.append(WorkoutOptionsPage(workout));
      }
    })
  }

  function makePage(workoutObject: WorkoutObject) {
    container.children().dispose();
    for (let i = 0; i < workoutObject.workouts.length; i++) {
      console.log(workoutObject.workouts[i].title);
      container.append(workoutTitle(workoutObject.workouts[i].title))
        .append(workoutOptionsButton(workoutObject.workouts[i]))
        .append(addWorkoutButton(workoutObject.workouts[i]))
      // .append(workoutOptionsModal(workoutObject.workouts[i]))
    }
  }

  makePage(workoutObject);


  return container;
}

export default WorkoutInput;
