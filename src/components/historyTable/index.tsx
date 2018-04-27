import {Composite, TextView, device} from 'tabris';

export default function historyTable(workoutDate: WorkoutDate) {

  const date = new Date(workoutDate.date);

  console.log(date);

  return new Composite({
    left: 10,
    top: 'prev()',
    right: 10,
    background: '#F4F4F4'
  }).append(new TextView({
    text: workoutDate.reps.toString(),
    left: 10,
    centerY: 0
  })).append(new TextView({
    text: workoutDate.weight.toString(),
    left: device.screenWidth / 3,
    centerY: 0
  })).append(new TextView({
    text: (date.getMonth() + 1) + '/' + date.getDate(),
    left: device.screenWidth * .67,
    centerY: 0
  }));
}
