import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "../../app.module";
import { TrainingLogDisplayComponent } from "./training-log-display.component";
import { By } from "@angular/platform-browser";

describe("SampleRoutinesComponent", () => {
  let component: TrainingLogDisplayComponent;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<TrainingLogDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TrainingLogDisplayComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
    });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display a question and search options", () => {
    const question = debugEl.query(By.css("label"));
    const buttons = debugEl.queryAll(By.css("button"));
    const dateInput = debugEl.query(By.css("input"));

    expect(question.nativeElement.textContent).toBe("What would you like to do?");
    expect(buttons[0].nativeElement.textContent).toBe(" Search Sessions ");
    expect(dateInput).toBeTruthy();


  })
});
