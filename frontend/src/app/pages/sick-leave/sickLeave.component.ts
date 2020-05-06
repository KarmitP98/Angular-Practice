import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "src/app/providers/authentication.service";
import {SickLeaveService} from "./sickLeaveService.service";

@Component({
  selector: "app-sickLeave",
  templateUrl: "./sickLeave.component.html",
  styleUrls: ["./sickLeave.component.css"]
})
export class SickLeaveComponent implements OnInit {
  //Start date for Sick
  sickStart: Date;
  //End Date for Sick
  sickEnd: Date;

  constructor(
    private router: Router,
    // Call service object
    private sickLeaveService: SickLeaveService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
  }

  // Navigates to page
  goTo(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  // Shows value of dates entered for sick leave
  dateChange(dateTime: any, type: any): void {
    //Check Material date change event from datepicker for start date and end date
    if (type == "sickStart") {
      this.sickStart = new Date(dateTime.value);
    } else {
      this.sickEnd = new Date(dateTime.value);
    }
  }

  //Submit date to Database
  submit() {
    this.sickLeaveService
      .addSickLeaveToServer({
        //existing employee ID
        employeeId: this.authenticationService.loggedInEmployee.employeeId,
        //Start date for leave
        date_from: this.formatDate(this.sickStart),
        // end date for leave
        date_to: this.formatDate(this.sickEnd),
        // Default leave status
        approved: "pending",
        //Default Type for leave
        type: "Sick"
      })
      .subscribe(
        (x: any) => {
          // response ID meanse data submitted succesfully
          if (x.id) {
            this.goTo("home");
          }
        },
        () => {
          //error When API failed to response
          alert("Some Error Occured");
        }
      );
  }

  // Forat date for MySQL
  private formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
