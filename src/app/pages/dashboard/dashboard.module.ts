import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    FontAwesomeModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    CommonModule,
  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule {}
