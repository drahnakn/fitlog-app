// This code defines the structure of the data for a training session.

export interface TrainingLog {
  _id: string;
  trainingDate: string;
  exercises: [
    { name: string; set1: number; set2: number; set3: number; set4: number; set5: number}
  ];
  comments: string;
}
