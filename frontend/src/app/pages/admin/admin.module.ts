import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";

import {AdminComponent} from "./admin.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [AdminComponent]
})
export class AdminModule {
}
