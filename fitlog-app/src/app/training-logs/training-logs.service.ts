import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { TrainingLog } from "./training-log.model";

@Injectable({providedIn: "root"})
export class TrainingLogsService {
  private trainingLogs: TrainingLog[] = [];
  private trainingLogsUpdated = new Subject<TrainingLog[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addTrainingLog(
    trainingDate: string,
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
    this.http.post<{ message: string, trainingLogId: string }>("http://localhost:3000/trainingLogs", trainingLog)
      .subscribe((responseData) => {
        const id = responseData.trainingLogId;
        trainingLog._id = id;
        this.trainingLogs.push(trainingLog);
        this.trainingLogsUpdated.next([...this.trainingLogs]);
        this.router.navigate(["/display"]);
      });
  }

  deleteTrainingLog(trainingLogId: string) {
    this.http.delete("http://localhost:3000/trainingLogs/" + trainingLogId)
      .subscribe(() => {
        const updatedTrainingLogs = this.trainingLogs.filter(trainingLog => trainingLog._id !== trainingLogId);
        this.trainingLogs = updatedTrainingLogs;
        this.trainingLogsUpdated.next([...this.trainingLogs]);
      });
  }

  getTrainingLogUpdateListener() {
    return this.trainingLogsUpdated.asObservable();
  }

  getTrainingLogs() {
    this.http.get<{message: string, trainingLogs: TrainingLog[]}>("http://localhost:3000/trainingLogs")
      .subscribe((trainingLogData) => {
        console.log(trainingLogData);
        this.trainingLogs = trainingLogData.trainingLogs;
        this.trainingLogsUpdated.next([...this.trainingLogs]);
      });
  }

}
