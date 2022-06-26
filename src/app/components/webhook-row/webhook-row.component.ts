import {AfterViewInit, Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Webhook} from "../../models/webhook";
import {interval, Subscription} from "rxjs";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {WebhooksService} from "../../services/webhooks.service";

@Component({
  selector: 'webhook-row',
  templateUrl: './webhook-row.component.html',
  styleUrls: [
    './webhook-row.component.scss'
  ]
})
export class WebhookRowComponent implements OnInit, AfterViewInit, OnDestroy {
  public methodColors = {
    GET: "btn-primary",
    POST: "btn-success",
    HEAD: "btn-dark",
    PUT: "btn-warning",
    DELETE: "btn-danger",
    CONNECT: "btn-success",
    OPTIONS: "btn-success",
    TRACE: "btn-dark",
    PATCH: "btn-warning",
  }
  public visibility: boolean = false;
  public timeAgo: string | [string, number?] = "";
  private subscription: Subscription;
  @Input('webhook') webhook: Webhook

  constructor(
    private webhooksService: WebhooksService
  ) {
  }

  ngAfterViewInit() {
    (window as any).hljs.highlightAll();
  }

  ngOnInit() {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')
    this.subscription = this.webhooksService.timer$.subscribe(() => {
      this.timeAgo = timeAgo.format(new Date(this.webhook.date));
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public toggleWebhook(): void {
    this.visibility = !this.visibility
  }
}
