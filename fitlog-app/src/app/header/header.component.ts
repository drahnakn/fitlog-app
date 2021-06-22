import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated =this.authservice.getAuthStatus();
    this.authListenerSubs = this.authservice.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onSignOut() {
    this.authservice.signOut();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
