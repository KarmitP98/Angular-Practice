import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class SignUpService {
  constructor(
    private http: HttpClient,
  ) {
  }

  // call signUp API
  public signUp(data): Observable<any> {
    return this.http.post("/api/signUp", data);
  }
}
