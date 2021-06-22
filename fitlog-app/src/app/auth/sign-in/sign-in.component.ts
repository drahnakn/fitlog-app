import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent {

  constructor(public authService: AuthService) {}

  onSignIn(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.singIn(form.value.email, form.value.password);
  }
}
