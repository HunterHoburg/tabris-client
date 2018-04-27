import {Composite, TextView, Picker, device} from 'tabris';
import {API} from '../../constants';
import HistoryTable from '../historyTable';

function history() {

  const workoutTypes = JSON.parse(localStorage.getItem('workout_types'));

  const workoutPicker = new Picker({
    top: 'prev() 10',
    left: 10,
    right: 10,
    itemCount: workoutTypes.workouts.length,
    itemText: (index) => workoutTypes.workouts[index].title,
    selectionIndex: 1,
  }).on({
    select: ({index}) => {
      fetch(API + '/workout/history?workout_id=' + workoutTypes.workouts[index].id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(function(res) {
        historyCard.children().dispose();
        historyCard.appendTo(pickerCard);
        historyCard.append(tableHeader());
        res.json().then(function(js) {
          historyCard.append(workoutDates(js));
        })
      }).catch(function(err) {
        console.log('ERROR', err);
      })
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
    bottom: 10,
  }).appendTo(pickerCard);

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
