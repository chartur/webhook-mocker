import {AfterViewInit, Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Webhook} from "../../models/webhook";
import {interval} from "rxjs";

@Component({
  selector: 'webhook-row',
  templateUrl: './webhook-row.component.html',
  styleUrls: [
    './webhook-row.component.scss'
  ]
})
export class WebhookRowComponent implements AfterViewInit {
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
  public timeAgo: string = "";
  @Input('webhook') webhook: Webhook

  ngAfterViewInit() {
    console.log(this.webhook);
    (window as any).hljs.highlightAll();
  }

  ngOnInit() {
    this.timeAgo = this.timeSince();
    const timeSubscription = interval( 60000)
      .subscribe(() => {
        this.timeSince();
      });
  }

  public toggleWebhook(): void {
    this.visibility = !this.visibility
  }

  private timeSince() {
    const date = this.webhook.date;
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
}
