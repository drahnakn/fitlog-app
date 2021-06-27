// This code creates a reactive form to input training session data.  The form will allow a user to add and remove exercises to be saved.

import { Component } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";

import { TrainingLogsService } from "../training-logs.service";
@Component({
  selector: "app-training-log-create",
  templateUrl: "./training-log-create.component.html"
})
export class TrainingLogCreateComponent {
  trainingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public trainingLogsService: TrainingLogsService,
  ) {
    this.trainingForm = this.fb.group({
      date: "",
      exercises: this.fb.array([]),
      comments: ""
    });
  }

  exercises(): FormArray {
    return this.trainingForm.get("exercises") as FormArray;
  }

  newExercise(): FormGroup {
    return this.fb.group({
      name: "",
      set1: "0",
      set2: "0",
      set3: "0",
      set4: "0",
      set5: "0"
    });
  }

  addExercise() {
    this.exercises().push(this.newExercise());
  }

  removeExercise(i: number) {
    this.exercises().removeAt(i);
  }

  onSubmit() {
    if(this.trainingForm.invalid) {
      return;
    }
    this.trainingLogsService.addTrainingLog(
      new Date(`${this.trainingForm.get("date").value} 07:00:00`).toLocaleDateString(),
      this.trainingForm.get("exercises").value,
      this.trainingForm.get("comments").value
    );
    this.trainingForm.reset();
  }
}
