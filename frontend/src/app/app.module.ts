import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AdminRequestsModule} from "src/app/pages/admin-requests/admin-requests.module";
import {LoginModule} from "src/app/pages/login/login.module";
import {SignUpModule} from "src/app/pages/sign-up/sign-up-module";
import {AuthGuardService} from "src/app/providers/auth.guard";
import {AuthenticationService} from "src/app/providers/authentication.service";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {TimeSheetModule} from "./pages/time-sheet/timeSheet.module";
import {TimeSheetLogModule} from "./pages/time-sheet-log/timeSheetLog.module";
import {AnnualLeaveModule} from "./pages/annual-leave/annualLeave.module";
import {AdminModule} from "./pages/admin/admin.module";
import {HomeModule} from "./pages/home/home.module";
import {SickLeaveModule} from "./pages/sick-leave/sickLeave.module";
import {LeaveRequestsModule} from "./pages/leave-requests/leaveRequests.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    TimeSheetModule,
    TimeSheetLogModule,
    AnnualLeaveModule,
    AdminModule,
    HomeModule,
    SickLeaveModule,
    LeaveRequestsModule,
    LoginModule,
    SignUpModule,
    AdminRequestsModule,

    // Material Model
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
