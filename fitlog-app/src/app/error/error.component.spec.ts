import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { ErrorComponent } from "./error.component";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe("ErrorComponent", () => {

  let component: ErrorComponent;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<ErrorComponent>;

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
      fixture = TestBed.createComponent(ErrorComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
    });
  }));

  it("should display the component", () => {
    expect(component).toBeTruthy();
  });

});
