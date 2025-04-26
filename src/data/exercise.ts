export type Exercise = {
  text: string,
  exercise?: string,
  sets?: number,
  work?: number,
  workUnit?: string
  resistance?: number,
  resistanceUnits?: string
  timeStamp: Date
  attributes?: string[]
}

export const SAMPLE: Exercise[] = [
  { text: "5x5 Deadlifts, 300lbs", exercise:"Deadlifts", sets: 5, work:5, workUnit:"repetitions", resistance: 300, resistanceUnits: "pounds", timeStamp: new Date()},
  { text: "5x5 Romanian Deadlifts, 40kg", exercise:"Deadlifts (Romanian)", sets: 5, work:5, workUnit:"repetitions",  resistance: 120, resistanceUnits: "kg", timeStamp: new Date(), attributes: ["Romanian"]},
  { text: "30 Minute Run, 2 miles", workUnit:"miles", exercise:"Run", work:2, timeStamp: new Date()},
  { text: "5x10 Burpees", work: 10, sets: 5, workUnit: "repetitions", exercise:"Burpees", timeStamp: new Date()}
]
