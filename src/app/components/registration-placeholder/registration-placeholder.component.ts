import {Component, OnDestroy, OnInit} from "@angular/core";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {MyConfigService} from "../../services/my-config.service";
import {Config} from "../../models/config";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'webhook-registration-placeholder',
  templateUrl: './registration-placeholder.component.html',
  styleUrls: [
    './registration-placeholder.component.scss'
  ]
})
export class RegistrationPlaceholderComponent implements OnInit, OnDestroy {
  public copyIcon = faCopy;
  public config: Partial<Config>;
  public path: string = environment.apiHost;
  public protocol: string = window.location.protocol;
  private subscriptions: Subscription[] = [];


  constructor(
    private myConfigService: MyConfigService
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.myConfigService.config$.subscribe(res => {
        this.config = res
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription?.unsubscribe())
  }
}
