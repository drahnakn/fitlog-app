import { AppComponent } from './app.component';
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "./app.module";

describe('AppComponent', () => {
  let component: AppComponent;
  let debugEl: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
