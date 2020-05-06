import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TimeSheetLogService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {
  }

  // Fetching Leave From Server
  fetchTimeSheetLogFromServer() {
    return this.http.get("/api/timesheet/", this.httpOptions);
  }

// Time Sheet Status Changed API for specif TimeSheet
  changeTimeSheetToServer(payload) {
    return this.http.put(
      "/api/timesheet/" + payload.timesheetId,
      payload,
      this.httpOptions
    );
  }
}
