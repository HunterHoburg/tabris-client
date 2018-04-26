import {Button, TextInput, Page} from 'tabris';
import {API} from '../../constants';
import NavigationView from '../navigation';
import Main from '../main';


function logWorkout(workout: {type: string, title: string, id: number}) {
  const Tracker = new Page({
    title: 'Tracker'
  });

  const reps = new TextInput({
    autoCapitalize: 'sentence',
    focused: true,
    message: 'Number of Reps',
    keyboard: 'number',
    top: 10,
    left: 10,
    right: 10
  }).appendTo(Tracker);

  const weight = new TextInput({
    autoCapitalize: 'sentence',
    focused: true,
    message: 'Weight Added',
    keyboard: 'number',
    top: 'prev() 10',
    left: 10,
    right: 10
  }).appendTo(Tracker);

  const submit = new Button({
    text: 'Submit',
    bottom: 10,
    right: 10,
    background: '#2b77db',
    textColor: 'white'
  }).on({
    select: () => {
      console.log('submitted', weight.text);
      console.log('workout type', workout);
      console.log('workout title', workout.title);
      const newWorkout = {
        workout_id: workout.id,
        reps: reps.text || 0,
        weight: weight.text || 0,
        type: workout.type,
        title: workout.title,
      }
      fetch(API + '/workout/log', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(newWorkout),
      }).then(function(res) {
        res.json().then(function(js) {
          NavigationView.pages().dispose();
          NavigationView.append(Main());
        })
      })
    }
  }).appendTo(Tracker);

  const cancel = new Button({
    text: 'Cancel',
    bottom: 10,
    left: 10,
    background: '#d14036',
    textColor: 'white'
  }).on({
    select: () => {
      console.log('hello');
    }
  }).appendTo(Tracker);

  return Tracker;
}

export default logWorkout;
