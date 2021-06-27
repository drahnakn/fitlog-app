/* This code will ensure that a person must be authenticated in order to access all routes in the application.  This will also prevent access to routes
even if attempting to manually access a route via the address bar in a web browser.
*/

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getAuthStatus();
    if (!isAuth) {
      this.router.navigate(["/"])
    }
    return isAuth;
  }
}
