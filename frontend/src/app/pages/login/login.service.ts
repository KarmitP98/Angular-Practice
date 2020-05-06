import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {AuthenticationService} from "src/app/providers/authentication.service";

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
  }

  // this method will call the login API
  public login(email, password) {
    return this.http.post("/api/login", {email, password})
      .pipe(tap((user) => {
        // set the user received from API to service, it will be used to identify if any user is logged in or not
        this.authenticationService.loggedInEmployee = user;
      }));
  }
}
