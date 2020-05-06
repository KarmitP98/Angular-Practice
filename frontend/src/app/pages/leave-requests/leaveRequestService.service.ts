import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LeaveRequestService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {
  }

  // Fetching Leave From Server
  fetchLeaveFromServer() {
    // Fetch leave from Server
    return this.http.get("/api/annual_leave/", this.httpOptions);
  }

  // Change Leave Status
  changeLeaveStatusToServer(payload) {
    // Update the leave Status
    return this.http.put(
      "/api/annual_leave/" + payload.annual_leaveId,
      payload,
      this.httpOptions
    );
  }
}
