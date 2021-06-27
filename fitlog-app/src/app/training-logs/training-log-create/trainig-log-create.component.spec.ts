import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "../../app.module";
import { TrainingLogCreateComponent } from "./training-log-create.component";
import { By } from "@angular/platform-browser";

describe("SampleRoutinesComponent", () => {
  let component: TrainingLogCreateComponent;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<TrainingLogCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TrainingLogCreateComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
    });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should immediately display a date input field, an add exercise button, and save button", () => {
    const dateInput = debugEl.queryAll(By.css("input"))[0];
    const buttons = debugEl.queryAll(By.css("button"));

    expect(dateInput.nativeElement.attributes.type.value).toBe("date");
    expect(buttons[0].nativeElement.textContent).toBe(" Add Exercise ");
    expect(buttons[1].nativeElement.textContent).toBe(" Save ");

  })

});
