import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TimeSheetService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {
  }

  // Fetching TimeSheet From Server
  fetchTimeSheetFromServer() {
    return this.http.get(
      "/api/timesheet/1?random=" + Math.random(),
      this.httpOptions
    );
  }

  // Add Time Sheet To Server
  addTimeSheetToServer(payload) {
    return this.http.post("/api/timesheet/", payload, this.httpOptions);
  }
}
