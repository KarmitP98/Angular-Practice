import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "src/app/providers/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
  }

  // Navigate to Page
  goTo(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
}
