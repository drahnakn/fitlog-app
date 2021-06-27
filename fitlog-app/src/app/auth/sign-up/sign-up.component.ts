// This code is for the sign up component which will accept an email address and a password to create a user to acces the application.

import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit, OnDestroy{
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log("Sign Up");
      }
    );
  }

  onSignUp(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
