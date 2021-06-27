import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "../../app.module";
import { AuthService } from "../../auth/auth.service";
import { SignUpComponent } from "./sign-up.component";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let debugEl: DebugElement;
  let authService: any;

  beforeEach(waitForAsync(() => {

    const authServiceSpy = jasmine.createSpyObj(
      "AuthService", ["getAuthStatusListener"]
    );

    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignUpComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      authService = TestBed.get(AuthService);
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should have a form field for email, a form field fo password, and a submit button to sign up", () => {
    const formFields = debugEl.queryAll(By.css("input"));
    const signUpButton = debugEl.query(By.css("button"));

    expect(formFields[0].nativeElement.attributes.name.value).toBe("email");
    expect(formFields[1].nativeElement.attributes.name.value).toBe("password");
    expect(signUpButton.nativeElement.attributes.type.value).toBe("submit");
    expect(signUpButton.nativeElement.textContent).toBe(" Sign Up ");
  });

});

