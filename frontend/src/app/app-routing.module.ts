import {AdminRequestsComponent} from "src/app/pages/admin-requests/admin-requests.component";
import {LoginComponent} from "src/app/pages/login/login.component";
import {SignUpComponent} from "src/app/pages/sign-up/sign-up.component";
import {AuthGuardService} from "src/app/providers/auth.guard";
import {LeaveRequestsComponent} from "./pages/leave-requests/leaveRequests.component";
import {TimeSheetLogComponent} from "./pages/time-sheet-log/timeSheetLog.component";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {TimeSheetComponent} from "./pages/time-sheet/timeSheet.component";
import {AnnualLeaveComponent} from "./pages/annual-leave/annualLeave.component";
import {SickLeaveComponent} from "./pages/sick-leave/sickLeave.component";
import {AdminComponent} from "./pages/admin/admin.component";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "signUp", component: SignUpComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuardService]},
  {path: "time-sheet", component: TimeSheetComponent, canActivate: [AuthGuardService]},
  {path: "annual-leave", component: AnnualLeaveComponent, canActivate: [AuthGuardService]},
  {path: "sick-leave", component: SickLeaveComponent, canActivate: [AuthGuardService]},
  {path: "admin", component: AdminComponent, canActivate: [AuthGuardService]},
  {path: "time-sheet-log", component: TimeSheetLogComponent, canActivate: [AuthGuardService]},
  {path: "leave-requests", component: LeaveRequestsComponent, canActivate: [AuthGuardService]},
  {path: "admin-requests", component: AdminRequestsComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
