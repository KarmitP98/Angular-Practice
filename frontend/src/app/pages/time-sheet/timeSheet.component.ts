import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "src/app/providers/authentication.service";
import {TimeSheetService} from "./timeSheetService.service";
import * as moment from "moment";

@Component({
  selector: "app-timeSheet",
  templateUrl: "./timeSheet.component.html",
  styleUrls: ["./timeSheet.component.css"]
})
export class TimeSheetComponent implements OnInit {
  //Column header for material table
  displayedColumns: string[] = ["name", "task", "date", "time_logged"];
  // Data source for material table
  dataSource;

  // Format date in HTML
  moment: any = moment;
  // Time for time input
  time;
  // Task for task input
  task;
  // Date picker for date picker
  date;
  // name for name input
  name;

  constructor(
    private timeSheetService: TimeSheetService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    // fetch data from API when view loaded
    this.fetchTimeSheetFromServer();

    this.name = this.authenticationService.loggedInEmployee.name;
  }

  //Fetching TimeSheet data from Server
  fetchTimeSheetFromServer() {
    this.timeSheetService.fetchTimeSheetFromServer().subscribe(
      (result: any) => {
        //Bind response to datasource object
        this.dataSource = result;
      },
      () => {
        //show error when API fails to response
        alert("Some Error occured");
      }
    );
  }

  //Submit New Task
  SubmitNewtimeSheet() {
    // Check for input field value
    if (this.task && this.name && this.date && this.time) {
      //create payload for request datae
      let payload: any = {
        //Existing Employyed ID
        employeeId: this.authenticationService.loggedInEmployee.employeeId,
        // task Value from input
        task: this.task,
        //name Value from input
        name: this.name,
        //date value from date picker
        date: moment(this.date).format("YYYY-MM-DD"),
        //time Value from time input
        time_logged: this.time,
        //default timesheet status
        approved: "pending"
      };
      //Call API to push the payloade
      this.timeSheetService.addTimeSheetToServer(payload).subscribe(
        (x: any) => {
          //refresh timesheet
          this.fetchTimeSheetFromServer();
        },
        () => {
          alert("Some Error Occured");
        }
      );
    } else {
      alert("Please fill all date");
    }
  }
}
