import {NgModule} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {TimeSheetComponent} from "./timeSheet.component";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  declarations: [TimeSheetComponent]
})
export class TimeSheetModule {
}
