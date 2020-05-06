import {Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "src/app/providers/authentication.service";
import {AnnualLeaveService} from "./annualLeaveService.service";

@Component({
  selector: "app-annualLeave",
  templateUrl: "./annualLeave.component.html",
  styleUrls: ["./annualLeave.component.css"]
})
export class AnnualLeaveComponent implements OnInit {
  // Start Date for Annual Leave
  annualStart: Date;
  // End Date for Annual leave
  annualEnd: Date;

  // Selection Value for Leave Type
  selectedValue: string;
  // Hard coded Leave Type Array
  leaveType = ["holiday", "religious event", "maternity leave", "paternity leave", "other"];

  constructor(
    private router: Router,
    // Service object to call API
    private annualLeaveService: AnnualLeaveService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    // Default Value for Leave Type
    this.selectedValue = this.leaveType[0];
  }

  // Navigate to page
  goTo(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  // Submit Leave to Server
  submit() {
    // Calling Annual leave
    this.annualLeaveService
      .addAnnualLeaveToServer({
        // Exisiting Employee ID
        employeeId: this.authenticationService.loggedInEmployee.employeeId,
        // Start Date
        date_from: this.formatDate(this.annualStart),
        // End Date
        date_to: this.formatDate(this.annualEnd),
        // Default Leave Status
        approved: "pending",
        // Default Leave Type
        type: this.selectedValue
      })
      .subscribe(
        (x: any) => {
          // If response has ID then data submitted successfully
          if (x.id) {
            this.goTo("home");
          }
        },
        () => {
          // show alert if API failed to response
          alert("Some Error Occured");
        }
      );

  }

  // Shows value of dates entered for annual leave
  dateChange(dateTime: any, type: any): void {
    // Change Value when material date picker change occur
    if (type == "annualStart") {
      this.annualStart = new Date(dateTime.value);
    } else {
      this.annualEnd = new Date(dateTime.value);
    }
  }

  // Foramat date for mySQL
  private formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
