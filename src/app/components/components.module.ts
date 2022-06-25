import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {RegistrationPlaceholderComponent} from "./registration-placeholder/registration-placeholder.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {WebhookRowComponent} from "./webhook-row/webhook-row.component";
import {AccordionModule} from "ngx-bootstrap/accordion";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RegistrationPlaceholderComponent,
    WebhookRowComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AccordionModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RegistrationPlaceholderComponent,
    WebhookRowComponent
  ]
})
export class ComponentsModule {}
