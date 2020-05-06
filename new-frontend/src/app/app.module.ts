import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {AnnualLeaveComponent} from "./pages/annual-leave/annual-leave.component";
import {SickLeaveComponent} from "./pages/sick-leave/sick-leave.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ToolbarComponent} from "./pages/toolbar/toolbar.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AnnualLeaveComponent,
    SickLeaveComponent,
    AdminPageComponent,
    DashboardComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
