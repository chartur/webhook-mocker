import {Component, OnDestroy, OnInit} from "@angular/core";
import {MyConfigService} from "../../services/my-config.service";
import {SocketService} from "../../services/socket.service";
import {WebhooksService} from "../../services/webhooks.service";
import {map, Observable, pipe, take} from "rxjs";
import {Webhook} from "../../models/webhook";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'webhook-home-page',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss'
  ]
})

export class DashboardComponent implements OnInit, OnDestroy {
  public host: string = window.location.host;
  public webhooks$: Observable<Array<Webhook>>

  constructor(
    private myConfigService: MyConfigService,
    private socketService: SocketService,
    private webhooksService: WebhooksService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const subdomain = this.route.snapshot.queryParams['subdomain'];
    if(!subdomain) {
      window.location.href = environment.homeSiteUrl;
      return
    }

    this.init();
    this.webhooksService.startInterval();
  }

  ngOnDestroy() {
    this.webhooksService.clearTimer();
  }

  private init(): void {
    this.webhooks$ = this.webhooksService.webhooks$
      .pipe(
        map((res) => Array.from(res).reverse())
      );
    this.myConfigService.config$
      .pipe(
        take(1)
      )
      .subscribe(config => {
        this.socketService.connect({
          subdomain: config.subdomain
        });
      })

    this.socketService.subscribe("request", (data: Webhook) => {
      this.webhooksService.add(data);
    });
  }
}
