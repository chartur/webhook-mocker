import {Component, OnInit} from "@angular/core";
import {MyConfigService} from "../../services/my-config.service";
import {SocketService} from "../../services/socket.service";
import {WebhooksService} from "../../services/webhooks.service";
import {map, Observable, pipe, take} from "rxjs";
import {Webhook} from "../../models/webhook";

@Component({
  selector: 'webhook-home-page',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss'
  ]
})

export class DashboardComponent implements OnInit {
  public host: string = window.location.host;
  public webhooks$: Observable<Array<Webhook>>

  constructor(
    private myConfigService: MyConfigService,
    private socketService: SocketService,
    private webhooksService: WebhooksService
  ) {
  }

  ngOnInit() {
    this.init();
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
