// This code creates a button component that will be used to access a diaolg component that will house the training log create component.

import {Component, Inject} from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: "app-training-log-dialog",
  templateUrl: "./training-log-dialog.component.html"
})
export class TrainingLogDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TrainingLogDialogModalComponent, {
      width: "80%"
    })
  }
}

@Component({
  selector: "app-training-log-dialog-",
  templateUrl: "./training-log-dialog-modal.component.html"
})
export class TrainingLogDialogModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TrainingLogDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {}

    onCloseClick(): void {
      this.dialogRef.close();
    }
}
