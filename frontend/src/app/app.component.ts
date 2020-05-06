import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "src/app/providers/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  constructor(
    private router: Router,
    public auth: AuthenticationService,
  ) {
  }

  // call logout API
  public logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
}
