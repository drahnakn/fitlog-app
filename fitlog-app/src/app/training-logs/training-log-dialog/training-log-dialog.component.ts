import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-training-log-dialog',
  templateUrl: './training-log-dialog.component.html'
})
export class TrainingLogDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TrainingLogDialogModalComponent, {
      width: '80%'
    })
  }
}

@Component({
  selector: 'app-training-log-dialog-',
  templateUrl: './training-log-dialog-modal.component.html'
})
export class TrainingLogDialogModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TrainingLogDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onCloseClick(): void {
      this.dialogRef.close();
    }
}
