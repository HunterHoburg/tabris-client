import {Button, TextInput, Page, Picker} from 'tabris';
import NavigationView from '../navigation';
import Main from '../main';
import {API} from '../../constants';


function addWorkout() {
  const workoutTypes = [
    {id: 'body', title: 'Body Weight'},
    {id: 'dumb', title: 'Dumbbell'},
    {id: 'bar', title: 'Barbell'},
  ];
  const Tracker = new Page({
    title: 'Tracker'
  });

  const workoutName = new TextInput({
    autoCapitalize: 'sentence',
    focused: true,
    message: 'Workout Name',
    top: 10,
    left: 10,
    right: 10
  }).appendTo(Tracker);

  const workoutType = new Picker({
    top: 'prev() 10',
    left: 10,
    right: 10,
    itemCount: workoutTypes.length,
    itemText: (index) => workoutTypes[index].title,
    selectionIndex: 1,
  }).appendTo(Tracker);

  const submit = new Button({
    text: 'Create Workout',
    bottom: 10,
    left: 10,
  }).on({
    select: () => {
      const workout = {
        type: workoutTypes[workoutType.selectionIndex].id,
        name: workoutName.text,
      };
      fetch(API +'/workout/save', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(workout)
      }).then(function(res) {
        const response = res.json().then(function(js) {
          console.log(js);
        });
        console.log('-=-=-=-', response);
      }).catch(function(err) {
        console.log('ERROR', err);
      })
      NavigationView.pages().dispose();
      NavigationView.append(Main());
    }
  }).appendTo(Tracker);

  return Tracker;
}

export default addWorkout;
