import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoginComponent} from "src/app/pages/login/login.component";
import {LoginService} from "src/app/pages/login/login.service";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  exports: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule {
}
