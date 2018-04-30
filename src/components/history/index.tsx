import {ActivityIndicator, Button, Composite, TextView, Picker, device} from 'tabris';
import NavigationView from "../navigation";
import {API} from '../../constants';
import HistoryTable from '../historyTable';
import LogWorkoutPage from '../logWorkout';


function history() {

  const workoutTypes = JSON.parse(localStorage.getItem('workout_types'));

  function fetchWorkoutHistory(index: number) {
    fetch(API + '/workout/history?workout_id=' + workoutTypes.workouts[index].id, {
      method: 'GET'
    }).then(function(res) {
      historyCard.children().dispose();
      historyCard.appendTo(pickerCard);
      res.json().then(function(js) {
        if (js.length) {
          historyCard.append(tableHeader());
          historyCard.append(workoutDates(js));
        } else {
          historyCard.append(noWorkoutMessage);
        }
        historyCard.append(logButton(workoutTypes.workouts[index]));
      })
    }).catch(function(err) {
      console.log('ERROR', err);
    })
  }

  fetchWorkoutHistory(0);

  const workoutPicker = new Picker({
    top: 'prev() 10',
    left: 10,
    right: 10,
    itemCount: workoutTypes.workouts.length,
    itemText: (index) => workoutTypes.workouts[index].title,
    selectionIndex: 0,
  }).on({

    select: ({index}) => {
      const waitingIndicator = new ActivityIndicator({
        centerX: 0,
        centerY: 0,
      }).appendTo(historyCard);
      fetchWorkoutHistory(index);
    }
  });

  const pickerCard = new Composite({
    top: 0,
    left: 0,
    right: 0,
  }).append(workoutPicker);

  const historyCard = new Composite({
    top: 'prev()',
    left: 10,
    right: 10,
  }).appendTo(pickerCard);

  const initialMessage = new TextView({
    centerX: 0,
    width: 200,
    top: 'prev() 100',
    alignment: 'center',
    text: 'Select a workout from above to see your logged history'
  }).appendTo(historyCard);

  const noWorkoutMessage = new TextView({
    centerX: 0,
    text: 'No sessions have been logged for this workout. Hit \'Log\' to enter some!',
    top: 'prev() 50',
    width: 300,
    alignment: 'center',
  });

  function logButton(workout: Workout) {
    return new Button({
      left: 10,
      right: 10,
      bottom: 'prev() -80',
      text: 'Log',
      background: '#2b77db',
      textColor: 'white',
    }).on({
      select: (workoutType) => {
        NavigationView.append(LogWorkoutPage(workout))
      }
    });
  }

  function tableHeader() {
    return new Composite({
      height: 30,
      left: 10,
      right: 10,
      top: 'prev() 10',
      background: '#ECECEC'
    }).append(new TextView({
      text: 'Reps',
      centerY: 0,
      left: 10
    })).append(new TextView({
      text: 'Weight',
      centerY: 0,
      left: device.screenWidth / 3,
    })).append(new TextView({
      text: 'Date',
      centerY: 0,
      left: device.screenWidth * .67
    }));
  }

  function workoutDates(workoutHistory: WorkoutDate[]) {
    return workoutHistory.map((workoutDate: WorkoutDate) => {
      return(HistoryTable(workoutDate));
    });
  }

  return pickerCard;
}

export default history;
