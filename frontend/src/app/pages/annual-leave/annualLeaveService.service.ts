import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AnnualLeaveService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {
  }

  addAnnualLeaveToServer(payload) {
    // Call annual_leave API to Submit the object to server
    return this.http.post("/api/annual_leave/", payload, this.httpOptions);
  }
}
