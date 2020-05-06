import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export enum ADMIN_STATUS {
  pending = "pending",
  approved = "approved",
  declined = "declined",
}

@Injectable()
export class AuthenticationService {
  public loggedInEmployee: any; // used to store user received from login API

  constructor(
    private http: HttpClient,
  ) {
  }

  // if loggedInEmployee exists, it will return true
  get isLoggedIn(): boolean {
    return this.loggedInEmployee !== null && this.loggedInEmployee !== undefined;
  }

  // if user is logged in and admin status is approved, return true
  get isAdmin(): boolean {
    return this.isLoggedIn && this.loggedInEmployee.admin === ADMIN_STATUS.approved;
  }

  // method to call logout API
  public logout(): Observable<any> {
    return this.http.get("/api/logout").pipe(tap(() => {
      // unset property after successfully logging out
      this.loggedInEmployee = undefined;
    }));
  }
}

