import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {TimeSheetLogComponent} from "./timeSheetLog.component";
import {CommonModule} from "@angular/common";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule
  ],
  declarations: [TimeSheetLogComponent]
})
export class TimeSheetLogModule {
}
