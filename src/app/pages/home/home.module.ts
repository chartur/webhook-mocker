import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    FontAwesomeModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule {}
