import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {AdminRequestsComponent} from "src/app/pages/admin-requests/admin-requests.component";
import {AdminRequestsService} from "src/app/pages/admin-requests/admin-requests.service";

@NgModule({
  imports: [
    MatTableModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  declarations: [AdminRequestsComponent],
  exports: [AdminRequestsComponent],
  providers: [AdminRequestsService],
})
export class AdminRequestsModule {
}
