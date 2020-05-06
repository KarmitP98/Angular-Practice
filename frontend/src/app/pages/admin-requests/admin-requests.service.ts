import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AdminRequestsService {
  constructor(
    private http: HttpClient,
  ) {
  }

  // method to call the fetch API
  fetchRequests(): Observable<any> {
    return this.http.get("/api/pendingAdminRequests");
  }

  // method to call update API
  update(employee): Observable<any> {
    return this.http.put(`/api/employees/${employee.employeeId}`, employee);
  }
}
