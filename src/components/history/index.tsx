import {TextView, Picker} from 'tabris';

function library() {
  const workoutPicker = new Picker({
    top: 'prev() 10',
    left: 10,
    right: 10,
  });

  return workoutPicker;
}

export default library;
