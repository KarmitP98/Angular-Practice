import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SignUpComponent} from "src/app/pages/sign-up/sign-up.component";
import {SignUpService} from "src/app/pages/sign-up/sign-up.service";

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    CommonModule
  ],
  declarations: [SignUpComponent],
  exports: [SignUpComponent],
  providers: [SignUpService],
})
export class SignUpModule {
}
