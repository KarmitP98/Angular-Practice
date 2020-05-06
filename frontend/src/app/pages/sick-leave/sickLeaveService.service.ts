import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SickLeaveService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {
  }

  // Add Sick leave to Database
  addSickLeaveToServer(payload) {
    return this.http.post("/api/annual_leave/", payload, this.httpOptions);
  }
}
