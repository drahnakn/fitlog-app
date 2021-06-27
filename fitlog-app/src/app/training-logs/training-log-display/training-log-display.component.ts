// This code creates the display component for trainig session data. From here a user can search for and delete existing training sessions.

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { TrainingLog } from "../training-log.model";
import { TrainingLogsService } from "../training-logs.service"

@Component({
  selector: "app-training-log-display",
  templateUrl: "./training-log-display.component.html",
  styleUrls: ["./training-log-display.component.css"]
})
export class TrainingLogDisplayComponent implements OnInit, OnDestroy {
  trainingDate: string = null;
  trainingLogs: TrainingLog[] = [];
  trainingLog: TrainingLog = null;

  displayMessage: string = "";
  private trainingLogsSubscription: Subscription;

  constructor(public trainingLogsService: TrainingLogsService) {}

  onSearch(requestedTainingDate: HTMLInputElement) {
    this.trainingDate = new Date(`${requestedTainingDate.value} 07:00:00`).toLocaleDateString();
    const filteredTrainingLogs = this.trainingLogs.filter(trainingLog => trainingLog.trainingDate === this.trainingDate);
    if (filteredTrainingLogs.length > 0) {
      this.trainingLog = filteredTrainingLogs[0];
    } else {
      this.trainingLog = null;
    }
    this.setDisplayMessage(this.trainingDate);
  }

  ngOnInit() {
    this.trainingLogsService.getTrainingLogs();
    this.trainingLogsSubscription = this.trainingLogsService.getTrainingLogUpdateListener()
      .subscribe((trainingLogs: TrainingLog[]) => {
        this.trainingLogs = trainingLogs;
      });
  }

  ngOnDestroy() {
    this.trainingLogsSubscription.unsubscribe();
  }

  onDelete(postId: string) {
    this.trainingLogsService.deleteTrainingLog(postId);
    this.trainingLog = null;
  }

  setDisplayMessage(trainingDate: string) {
    this.displayMessage = "Would you like to add a training session for " + trainingDate + "?";
  }
}
