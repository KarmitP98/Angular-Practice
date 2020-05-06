import {Component, OnInit} from "@angular/core";
import {LeaveRequestService} from "./leaveRequestService.service";
import * as moment from "moment";

@Component({
  selector: "app-leaveRrequests",
  templateUrl: "./leaveRequests.component.html",
  styleUrls: ["./leaveRequests.component.css"]
})
export class LeaveRequestsComponent implements OnInit {

  // Column Header For Material table array
  displayedColumns: string[] = [
    "select",
    "annual_leaveId",
    "employeeId",
    "date_from",
    "date_to",
    "type",
    "approved"
  ];
  // List that will render in material table
  leaveList;
  // Current Selected leave
  selectedLeave: any = {};
  // Format date in HTML
  moment: any = moment;

  constructor(private leaveRequestService: LeaveRequestService) {
  }

  ngOnInit(): void {

    // Fetch Data from API when View Loaded
    this.fetchLeave();
  }

  // Fetching Leave from Backend
  fetchLeave() {

    this.leaveRequestService.fetchLeaveFromServer().subscribe(
      (leaveList: any) => {
        // Bind response to the Class Object
        this.leaveList = leaveList;
      },
      error => {
      }
    );
  }

  // Change Leave Status
  changeLeaveStatus(event, leave) {
    // Change Current Selected value
    this.selectedLeave = leave;
  }

// Approve Selected List Request
  ApproveLeave(status) {
    // Change the status of approved for selected value
    this.selectedLeave.approved = status;
    // Format date to send whole object to Server
    this.selectedLeave.date_from = this.formatDate(
      new Date(this.selectedLeave.date_from)
    );
    // Format date to send whole object to Server
    this.selectedLeave.date_to = this.formatDate(
      new Date(this.selectedLeave.date_to)
    );
    // Calling Server
    this.leaveRequestService
      .changeLeaveStatusToServer(this.selectedLeave)
      .subscribe(
        () => {
          // Empty current Selection
          this.selectedLeave = {};
        },
        () => {
          // Show error when API failed to response.
          alert("Error Occured");
        }
      );
  }

  // Format Date For MYSQL
  private formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
