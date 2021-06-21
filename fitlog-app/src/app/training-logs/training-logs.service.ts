import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TrainingLog } from "./training-log.model";

@Injectable({providedIn: 'root'})
export class TrainingLogsService {
  private trainingLogs: TrainingLog[] = [];
  private trainingLogsUpdated = new Subject<TrainingLog[]>();

  constructor(private http: HttpClient) {}

  addTrainingLog(trainingDate: string,
    exercises: [
      {name: string; set1: number; set2: number; set3: number; set4: number; set5: number}
    ],
    comments: string) {
    const trainingLog: TrainingLog = {
      _id: null,
      trainingDate: trainingDate,
      exercises: exercises,
      comments: comments
    }
    this.http.post<{message: string}>("http://localhost:3000/trainingLogs", trainingLog)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.trainingLogs.push(trainingLog);
        this.trainingLogsUpdated.next([...this.trainingLogs]);
      });

  }

  getTrainingLOgUpdateListener() {
    return this.trainingLogsUpdated.asObservable();
  }

  getTrainingLogs() {
    this.http.get<{message: string, trainingLogs: TrainingLog[]}>('http://localhost:3000/trainingLogs')
      .subscribe((trainingLogData) => {
        this.trainingLogs = trainingLogData.trainingLogs;
        this.trainingLogsUpdated.next([...this.trainingLogs]);
      });
  }

}
