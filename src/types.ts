interface WorkoutObject {
  workouts: [
    {
      id: number,
      type: string,
      user_id: string,
      title: string
    }
  ]
}

interface Workout {
  id: number,
  type: string,
  user_id: string,
  title: string,
}


interface WorkoutDate {
  id: number,
  workout_id: number,
  reps: number,
  weight: number,
  type: string,
  max: number,
  title: string,
  date: Date
}
