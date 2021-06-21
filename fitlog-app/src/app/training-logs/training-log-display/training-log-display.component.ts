import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingLog } from '../training-log.model';
import { TrainingLogsService } from '../training-logs.service'

@Component({
  selector: 'app-training-log-display',
  templateUrl: './training-log-display.component.html',
  styleUrls: ['./training-log-display.component.css']
})
export class TrainingLogDisplayComponent implements OnInit, OnDestroy {

  trainingLogs: TrainingLog[] = [];
  private trainingLogsSubscription: Subscription;

  constructor(public trainingLogsService: TrainingLogsService) {}

  ngOnInit() {
    this.trainingLogsService.getTrainingLogs();
    this.trainingLogsSubscription = this.trainingLogsService.getTrainingLOgUpdateListener()
      .subscribe((trainingLogs: TrainingLog[]) =>{
        this.trainingLogs = trainingLogs;
      });
  }

  ngOnDestroy() {
    this.trainingLogsSubscription.unsubscribe();
  }
}
