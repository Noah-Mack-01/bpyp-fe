import { ListProperties } from "../components/shared/lists"

type ExerciseType = 'aerobic' | 'anaerobic'

export type Exercise = ExerciseSummary & {
  text?: string,
  sets?: number,
  work?: number,
  workUnit?: string
  resistance?: number,
  resistanceUnits?: string
  duration?: string,
  durationUnits?: string,
  timeStamp?: Date
  attributes?: string[]
}

export type ExerciseSummary = {
  id: string,
  exercise?: string,
  summary?: string,
  type?: ExerciseType 
}

export type ExerciseContext = {
  loading: boolean
  error: any
  getExercise: (userId: string, exerciseId: string) => Promise<Exercise>|undefined
  createNewExercise: (userId: string, exercise: Exercise) => Promise<boolean>
  getStructure: (message: string) => Promise<any>
}

export function exerciseToListItem(ex: Exercise): ListProperties {
  return {title: ex.exercise ?? 'N/A', description: ex.summary, icon:iconMap[ex.type ?? ''], tags:ex.attributes}
}

const iconMap: {[key: string]:string} = {
  'aerobic': 'walk',
  'anaerobic':'dumbbell',
}
export const SAMPLE: Exercise[] = [
  // Strength Training (Anaerobic)
  {
    id: "1a", 
    text: "5x5 Bench Press, 185lbs", 
    summary: "5 sets of 5 reps with 185lbs", 
    exercise: "Bench Press", 
    type: "anaerobic", 
    sets: 5, 
    work: 5, 
    workUnit: "repetitions", 
    resistance: 185, 
    resistanceUnits: "pounds", 
    timeStamp: new Date(Date.now() - 86400000) // yesterday
  },
  { 
    id: "2bd0",
    text: "3x12 Squats, 225lbs", 
    summary: "3 sets of 12 reps with 225lbs",
    exercise: "Squats", 
    type: "anaerobic", 
    sets: 3, 
    work: 12, 
    workUnit: "repetitions", 
    resistance: 225, 
    resistanceUnits: "pounds", 
    timeStamp: new Date(Date.now() - 172800000) // 2 days ago
  },
  { 
    id: "11111",
    text: "4x8 Pull-ups", 
    summary: "4 sets of 8 reps with bodyweight",
    exercise: "Pull-ups", 
    type: "anaerobic", 
    sets: 4, 
    work: 8, 
    workUnit: "repetitions", 
    resistance: 0, 
    resistanceUnits: "bodyweight", 
    timeStamp: new Date(Date.now() - 259200000) // 3 days ago
  },
  { 
    id: "AAAAAAA",
    text: "3x15 Kettlebell Swings, 35kg", 
    summary: "3 sets of 15 reps with 35kg kettlebell",
    exercise: "Kettlebell Swings", 
    type: "anaerobic", 
    sets: 3, 
    work: 15, 
    workUnit: "repetitions", 
    resistance: 35, 
    resistanceUnits: "kg", 
    timeStamp: new Date()
  },
  { 
    id: "testkey",
    text: "5x5 Overhead Press, 95lbs", 
    summary: "5 sets of 5 reps with 95lbs",
    exercise: "Overhead Press", 
    type: "anaerobic", 
    sets: 5, 
    work: 5, 
    workUnit: "repetitions", 
    resistance: 95, 
    resistanceUnits: "pounds", 
    timeStamp: new Date(Date.now() - 432000000) // 5 days ago
  },
  
  // Cardio (Aerobic)
  { 
    id: "testkey",
    text: "45 Minute Cycling, 15 miles", 
    summary: "45 minutes, covered 15 miles",
    exercise: "Cycling", 
    type: "aerobic", 
    duration: "45", 
    durationUnits: "minutes", 
    work: 15, 
    workUnit: "miles", 
    timeStamp: new Date(Date.now() - 86400000) // yesterday
  },
  { 
    id: "testkey",
    text: "30 Minute Treadmill, incline 3.0", 
    summary: "30 minutes at incline 3.0",
    exercise: "Treadmill", 
    type: "aerobic", 
    duration: "30", 
    durationUnits: "minutes", 
    resistance: 3.0, 
    resistanceUnits: "incline", 
    timeStamp: new Date()
  },
  { 
    id: "testkey",
    text: "Swimming, 20 laps", 
    summary: "20 laps in Olympic pool",
    exercise: "Swimming", 
    type: "aerobic", 
    work: 20, 
    workUnit: "laps", 
    timeStamp: new Date(Date.now() - 345600000) // 4 days ago
  },
  { 
    id: "testkey",
    text: "HIIT Session, 20 minutes", 
    summary: "20 minute HIIT workout, 40s on/20s off",
    exercise: "HIIT", 
    type: "aerobic", 
    duration: "20", 
    durationUnits: "minutes", 
    timeStamp: new Date(Date.now() - 172800000) // 2 days ago
  },
  
  // Mixed or Specialized
  { 
    id: "testkey",
    text: "4x10 Mountain Climbers", 
    summary: "4 sets of 10 reps each side",
    exercise: "Mountain Climbers", 
    type: "aerobic", 
    sets: 4, 
    work: 10, 
    workUnit: "repetitions", 
    timeStamp: new Date(Date.now() - 86400000) // yesterday
  },
  { 
    id: "testkey",
    text: "3 Rounds Circuit Training", 
    summary: "3 rounds of full-body circuit",
    exercise: "Circuit Training", 
    type: "aerobic", 
    sets: 3, 
    workUnit: "rounds", 
    timeStamp: new Date(Date.now() - 518400000) // 6 days ago
  },
  { 
    id: "testkey",
    text: "3x8 Front Squats, 135lbs", 
    summary: "3 sets of 8 reps with 135lbs",
    exercise: "Front Squats", 
    type: "anaerobic", 
    sets: 3, 
    work: 8, 
    workUnit: "repetitions", 
    resistance: 135, 
    resistanceUnits: "pounds", 
    attributes: ["Front"],
    timeStamp: new Date()
  },
  { 
    id: "testkey",
    text: "5x10 Medicine Ball Slams, 15kg", 
    summary: "5 sets of 10 reps with 15kg ball",
    exercise: "Medicine Ball Slams", 
    type: "anaerobic", 
    sets: 5, 
    work: 10, 
    workUnit: "repetitions", 
    resistance: 15, 
    resistanceUnits: "kg", 
    timeStamp: new Date(Date.now() - 259200000) // 3 days ago
  },
  { 
    id: "testkey",
    text: "Yoga Session, 60 minutes", 
    summary: "60 minute vinyasa flow",
    exercise: "Yoga", 
    type: "aerobic", 
    duration: "60", 
    durationUnits: "minutes", 
    attributes: ["Vinyasa"],
    timeStamp: new Date(Date.now() - 432000000) // 5 days ago
  },
  
  // With varied attributes
  { 
    id: "testkey",
    text: "5x5 Sumo Deadlifts, 265lbs", 
    summary: "5 sets of 5 reps with 265lbs, sumo stance",
    exercise: "Deadlifts", 
    type: "anaerobic", 
    sets: 5, 
    work: 5, 
    workUnit: "repetitions", 
    resistance: 265, 
    resistanceUnits: "pounds", 
    attributes: ["Sumo"],
    timeStamp: new Date()
  },
  { 
    id: "testkey",
    text: "3x12 Incline Dumbbell Press, 40lbs each", 
    summary: "3 sets of 12 reps with 40lb dumbbells",
    exercise: "Dumbbell Press", 
    type: "anaerobic", 
    sets: 3, 
    work: 12, 
    workUnit: "repetitions", 
    resistance: 40, 
    resistanceUnits: "pounds", 
    attributes: ["Incline", "Dumbbell"],
    timeStamp: new Date(Date.now() - 172800000) // 2 days ago
  },
  { 
    id: "testkey",
    text: "4x8 Close-Grip Bench Press, 155lbs", 
    summary: "4 sets of 8 reps with 155lbs, close grip",
    exercise: "Bench Press", 
    type: "anaerobic", 
    sets: 4, 
    work: 8, 
    workUnit: "repetitions", 
    resistance: 155, 
    resistanceUnits: "pounds", 
    attributes: ["Close-Grip"],
    timeStamp: new Date(Date.now() - 345600000) // 4 days ago
  },
  { 
    id: "testkey",
    text: "Trail Running, 4 miles, hilly terrain", 
    summary: "4 miles on hilly forest trail",
    exercise: "Running", 
    type: "aerobic", 
    work: 4, 
    workUnit: "miles", 
    attributes: ["Trail", "Hilly"],
    timeStamp: new Date()
  },
  { 
    id: "testkey",
    text: "2x20 Standing Calf Raises, 100kg", 
    summary: "2 sets of 20 reps with 100kg",
    exercise: "Calf Raises", 
    type: "anaerobic", 
    sets: 2, 
    work: 20, 
    workUnit: "repetitions", 
    resistance: 100, 
    resistanceUnits: "kg", 
    attributes: ["Standing"],
    timeStamp: new Date(Date.now() - 259200000) // 3 days ago
  }
];
