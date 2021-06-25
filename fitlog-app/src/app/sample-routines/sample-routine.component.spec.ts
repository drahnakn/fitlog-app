import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { SampleRoutinesComponent } from "./sample-routines.component"
import { By } from "@angular/platform-browser";

describe("SampleRoutinesComponent", () => {
  let component: SampleRoutinesComponent;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<SampleRoutinesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SampleRoutinesComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should display three cards", () => {
    const cards = debugEl.queryAll(By.css("mat-card"));
    expect(cards.length).toBe(3);
  });

  it('should have a jump rope routine, a stretching routine, and a push up routine', () => {
    const cardTitles = debugEl.queryAll(By.css("mat-card-title"));

    expect(cardTitles[0].nativeElement.textContent).toBe("Jump Rope Interval");
    expect(cardTitles[1].nativeElement.textContent).toBe("Rise & Shine Stretch");
    expect(cardTitles[2].nativeElement.textContent).toBe("5 x 5 Push Up");
  })
});

