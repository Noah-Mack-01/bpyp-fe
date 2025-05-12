import { ListProperties } from "../components/shared/lists"

type ExerciseType = 'aerobic' | 'anaerobic'

export type Exercise = ExerciseSummary & {
  sets?: number,
  work?: number,
  workUnit?: string
  resistance?: number,
  resistanceUnits?: string
  duration?: string,
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
  getExercise: (exerciseId: string) => Promise<Exercise>|undefined
  createNewExercise: (exercise: Exercise) => Promise<boolean>
  getStructure: (message: string) => Promise<any>
  getAllExercises: () => Promise<Exercise[]>
}

export function exerciseToListItem(ex: Exercise): ListProperties {
  console.log(ex.type?.toLocaleLowerCase())
  return {title: ex.exercise ?? 'N/A', description: ex.summary, icon:iconMap[ex.type?.toLocaleLowerCase() ?? ''], tags:ex.attributes}
}

const iconMap: {[key: string]:string} = {
  'strength': 'dumbbell',
  'cardio': 'walk',
  'aerobic': 'walk',
  'anaerobic':'dumbbell',
  'core':'rowing',
  'mobility':'yoga',
  'conditioning':'kettlebell',
  'recovery':'plus-circle-outline'
}