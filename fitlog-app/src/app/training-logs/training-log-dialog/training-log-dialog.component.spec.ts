import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "../../app.module";
import { TrainingLogDialogComponent, TrainingLogDialogModalComponent } from "./training-log-dialog.component";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from "@angular/platform-browser";

describe("ErrorComponent", () => {

  let componentBase: TrainingLogDialogComponent;
  let componentDialog: TrainingLogDialogModalComponent;
  let debugBaseEl: DebugElement;
  let debugDialogEl: DebugElement;
  let fixtureBase: ComponentFixture<TrainingLogDialogComponent>;
  let fixtureDialog: ComponentFixture<TrainingLogDialogModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents().then(() => {
      fixtureBase = TestBed.createComponent(TrainingLogDialogComponent);
      fixtureDialog = TestBed.createComponent(TrainingLogDialogModalComponent);
      componentBase = fixtureBase.componentInstance;
      componentDialog = fixtureDialog.componentInstance;
      debugBaseEl = fixtureBase.debugElement;
      debugDialogEl = fixtureBase.debugElement;
    });

  }));

  it("should display the base component and the dialog component", () => {
    expect(componentBase).toBeTruthy();
    expect(componentDialog).toBeTruthy();
  });

  it("should only be a button displayed for the base component", () => {
    const button = debugBaseEl.query(By.css("button"));
    expect(button.nativeElement.textContent).toBe("Add Sessions");
  });

});
