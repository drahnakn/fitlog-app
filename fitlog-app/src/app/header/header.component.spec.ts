import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { AuthService } from "../auth/auth.service";
import { HeaderComponent } from "./header.component";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugEl: DebugElement;
  let authService: any;

  beforeEach(waitForAsync(() => {

    const authServiceSpy = jasmine.createSpyObj(
      "AuthService", ["getAuthStatus", "getAuthStatusListener"]
    );

    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      authService = TestBed.get(AuthService);
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
    console.log(debugEl.nativeElement.outerHTML);
  });

  it("should display the fitlog brand", () => {
    const brand = debugEl.queryAll((By.css("span")))[0].nativeElement.textContent;
    expect(brand).toBe("FitLog");
  });

})

