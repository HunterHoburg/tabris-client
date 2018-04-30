import {Button, Page, Composite, TextInput, Picker} from 'tabris';
import NavigationView from "../navigation";
import LogWorkoutPage from "../logWorkout";
import MainPage from '../main';
import {API, workoutTypes} from "../../constants";

function WorkoutInput(workout: Workout) {

  const container = new Page({
    title: `${workout.title} Options`
  });

  const workoutName = new TextInput({
    autoCapitalize: 'word',
    focused: false,
    text: workout.title,
    top: 10,
    left: 10,
    right: 10
  }).appendTo(container);

  const workoutType = new Picker({
    top: 'prev() 10',
    left: 10,
    right: 10,
    itemCount: workoutTypes.length,
    itemText: (index) => workoutTypes[index].title,
    selectionIndex: workoutTypes.map(function(type) {return type.title}).indexOf(workout.type)
  }).appendTo(container);

  const saveChanges = new Button({
    text: 'Save Changes',
    bottom: 10,
    left: 10,
    right: 10,
    background: '#2b77db',
    textColor: 'white',
    // enabled: (workout.title !== workoutName.text) || (workout.type !== workoutTypes[workoutType.selectionIndex].title)
  }).on({
    select: () => {
      let newWorkout = workout;
      newWorkout.title = workoutName.text;
      newWorkout.type = workoutTypes[workoutType.selectionIndex].title;
      fetch(API +'/workout/update?workout_id=' + workout.id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(newWorkout)
      }).then(function(res) {
        NavigationView.pages().dispose();
        NavigationView.append(MainPage());
      }).catch(function(err) {
        console.log('ERROR', err);
      })
    }
  }).appendTo(container);

  const deleteWorkout = new Button({
    text: 'Delete Workout',
    bottom: 'prev() 10',
    left: 10,
    right: 10,
    background: '#D14036',
    textColor: 'white'
  }).on({
    select: () => {
      fetch(API +'/workout/delete?workout_id=' + workout.id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(workout)
      }).then(function(res) {
        NavigationView.pages().dispose();
        NavigationView.append(MainPage());
      }).catch(function(err) {
        console.log('ERROR', err);
      })
    }
  }).appendTo(container);


  return container;
}

export default WorkoutInput;
