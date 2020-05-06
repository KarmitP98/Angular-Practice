import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SignUpService} from "src/app/pages/sign-up/sign-up.service";
import {ADMIN_STATUS} from "src/app/providers/authentication.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  // list of titles
  public salutations: any[] = [
    {value: "Mr", viewValue: "Mr."},
    {value: "Mrs", viewValue: "Mrs."},
    {value: "Ms", viewValue: "Ms."},
  ];

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    // initialize signup form
    this.signUpForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      title: new FormControl("Mr"),
      dob: new FormControl(""),
      admin: new FormControl(false),
    });
  }

  // clear values of each field
  public reset() {
    this.signUpForm.reset();
  }

  // submit the form to backend to create User
  public submit() {
    const value = this.signUpForm.value;
    // if admin toggled is ON, then set status to 'pending' to identify as pending request
    if (value.admin) {
      value.admin = ADMIN_STATUS.pending;
    } else {
      // else set status to declined
      value.admin = ADMIN_STATUS.declined;
    }
    // format date of birth
    if (value.dob) {
      value.dob = this.formatDate(value.dob);
    }

    // call signup API
    this.signUpService.signUp(value).subscribe(() => {
      // navigate to login page after success
      this.router.navigate(["/"]);
    }, () => {
      // open snackbar to show error
      this.matSnackBar.open("Something went wrong", "Dismiss", {duration: 2000});
    });
  }

  // format date to YYYY-MM-DD
  private formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

}
