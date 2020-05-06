import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LoginService} from "src/app/pages/login/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup; // FormGroup to store user values of email and password

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    // initialize loginForm with email and password as empty values
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]), // field is required
      password: new FormControl("", [Validators.required]) // field is required
    });
  }

  showError(error) {
    // show a snackbar at the bottom to indicate the error
    this.snackBar.open(error, "Close", {
      duration: 2000,
    });
  }

  signUp() {
    // go to sign up form
    this.router.navigate(["/signUp"]);
  }

  submit() {
    // get email and password from form
    const {email, password} = this.loginForm.value;

    // call login API with email and password
    this.loginService.login(email, password).subscribe(() => {
      // if success, go to home page
      this.router.navigate(["/home"]);
    }, () => {
      // if error, show snack bar
      this.showError("Invalid credentials");
    });
  }

}
