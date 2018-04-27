import {TabFolder} from "tabris";
import WorkoutTab from "./tabs/workoutTab";
import HistoryTab from "./tabs/historyTab";

function tabs(workouts: {workouts: [{id: number, type: string, user_id: string, title: string}]}) {
  const tabFolder = new TabFolder({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    // paging: true
  });
  tabFolder.append(WorkoutTab(workouts));
  tabFolder.append(HistoryTab());

  return tabFolder;
}

export default tabs;
