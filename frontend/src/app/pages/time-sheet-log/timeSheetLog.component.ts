import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {TimeSheetLogService} from "./timeSheetLogService.service";
import * as moment from "moment";

@Component({
  selector: "app-timeSheetLog",
  templateUrl: "./timeSheetLog.component.html",
  styleUrls: ["./timeSheetLog.component.css"]
})
export class TimeSheetLogComponent implements OnInit {
  //Header Column for Material table
  displayedColumns: string[] = [
    "select",
    "name",
    "task",
    "date",
    "time_logged",
    "approved"
  ];
  // Data source for material table
  public timeSheetLog: any;
  //Current selected TimeSheet
  selectedTimeSheet: any = {};
  moment: any = moment;

  constructor(
    private router: Router,
    private timeSheetLogService: TimeSheetLogService
  ) {
  }

  ngOnInit(): void {
    //Fetch Timesheet from server when view load
    this.fetchTimeSheet();
  }

  goTo(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  fetchTimeSheet() {
    // Call TimeSheet API
    this.timeSheetLogService.fetchTimeSheetLogFromServer().subscribe(
      (timeSheetList: any) => {
        //Bind response to our object
        this.timeSheetLog = timeSheetList;
      },
      () => {
        alert("Some Error Occured");
      }
    );
  }

  //Change Timesheet Status
  changeTimeSheetStatus(event, leave) {
    //Change current TimeSheet status
    this.selectedTimeSheet = leave;
  }

  ApproveTimeSheet(status) {
    //Change approved status based on accepted and decline button
    this.selectedTimeSheet.approved = status;
    this.selectedTimeSheet.date = this.formatDate(
      new Date(this.selectedTimeSheet.date)
    );
    //Call API
    this.timeSheetLogService
      .changeTimeSheetToServer(this.selectedTimeSheet)
      .subscribe(
        () => {
          //Empty existing selected Value
          this.selectedTimeSheet = {};
        },
        () => {
        }
      );
  }

  //Format date for MYSQL database
  private formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
