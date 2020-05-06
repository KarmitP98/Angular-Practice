import {Component, OnInit} from "@angular/core";
import * as moment from "moment";
import {AdminRequestsService} from "src/app/pages/admin-requests/admin-requests.service";
import {ADMIN_STATUS} from "src/app/providers/authentication.service";

@Component({
  selector: "app-admin-requests",
  templateUrl: "./admin-requests.component.html",
  styleUrls: ["./admin-requests.component.css"]
})
export class AdminRequestsComponent implements OnInit {
  public moment: any = moment;
  // selected request by user
  public selectedRequest: any;
  // list of requests
  public requestsList: any[] = [];
  // below columns will be displayed in table
  public displayedColumns: string[] = [
    "select",
    "employeeId",
    "name",
    "email",
    "dob",
    "admin"
  ];

  constructor(
    private adminRequestsService: AdminRequestsService
  ) {
  }

  ngOnInit(): void {
    // fetch all the requests
    this.fetchRequests();
  }

  public approve() {
    // format DOB in YYYY-MM-DD
    this.selectedRequest.dob = moment(this.selectedRequest.dob).format("YYYY-MM-DD");
    // set admin status as approved
    this.selectedRequest.admin = ADMIN_STATUS.approved;
    // call the update API
    this.adminRequestsService.update(this.selectedRequest)
      .subscribe(() => {
      }, () => {
        // if any error occured, set status to pending again
        this.selectedRequest.admin = ADMIN_STATUS.pending;
      });
  }

  public reject() {
    // format DOB in YYYY-MM-DD
    this.selectedRequest.dob = moment(this.selectedRequest.dob).format("YYYY-MM-DD");
    // set admin status as rejected
    this.selectedRequest.admin = ADMIN_STATUS.declined;
    // call the update API
    this.adminRequestsService.update(this.selectedRequest)
      .subscribe(() => {
      }, () => {
        // if any error occured, set status to pending again
        this.selectedRequest.admin = ADMIN_STATUS.pending;
      });
  }

  private fetchRequests() {
    // call API to fetch requests and set it in property
    this.adminRequestsService.fetchRequests()
      .subscribe((requests) => {
        this.requestsList = requests;
      });
  }

}
