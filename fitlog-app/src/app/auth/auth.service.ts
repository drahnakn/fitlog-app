/* This is the auth service that will be responsible for creating a user, authenticating a user during sign in, and ensuring a user will remain authenticated
in the event of a page reload.
*/

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post("http://localhost:3000/user/signup", authData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      }, error => {
        this.authStatusListener.next(false);
        console.log(error);
      });
  }

  singIn(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number, userId: string }>("http://localhost:3000/user/signin", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
          this.saveAuthData(this.userId, token, expirationDate);
          this.router.navigate(["/"]);
        }
      }, error => {
        console.log(error);
      });
  }

  autoAuthUser() {
    const userAuthData = this.getAuthDate();
    const now = new Date();
    const expiresIn = userAuthData.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = userAuthData.token;
      this.isAuthenticated = true;
      this.userId = userAuthData.currentUser;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  signOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private saveAuthData(userId: string, token: string, expirationDate: Date) {
    localStorage.setItem("currentUser", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", expirationDate.toISOString())
  }

  private clearAuthData() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
  }

  private getAuthDate() {
    const user = localStorage.getItem("currentUser");
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    if(!user || !token || !expirationDate) {
      return;
    }
    return {
      currentUser: user,
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.signOut();
    }, duration*1000);
  }
}
