import {Button, TextView, RefreshComposite} from 'tabris';
import NavigationView from "../navigation";
import LogWorkoutPage from "../logWorkout/index";
import WorkoutOptionsPage from '../workoutOptions/index';
import {API} from "../../constants";

function Index(workoutObject: WorkoutObject) {

  const container = new RefreshComposite({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
      background: '#2b77db',
      textColor: 'white',
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
        NavigationView.append(WorkoutOptionsPage(workout));
      }
    })
  }

  function makePage(workoutObject: WorkoutObject) {
    container.children().dispose();
    for (let i = 0; i < workoutObject.workouts.length; i++) {
      container.append(workoutTitle(workoutObject.workouts[i].title))
        .append(workoutOptionsButton(workoutObject.workouts[i]))
        .append(addWorkoutButton(workoutObject.workouts[i]))
    }
  }

  makePage(workoutObject);

  return container;
}

export default Index;
