import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Webhook} from "../models/webhook";

@Injectable({
  providedIn: "root"
})
export class WebhooksService {
  private _webhooks: Set<Webhook> = new Set()
  private webhooksSubject: BehaviorSubject<Set<Webhook>> = new BehaviorSubject<Set<Webhook>>(this._webhooks);
  public readonly webhooks$: Observable<Set<Webhook>> = this.webhooksSubject.asObservable();
  private intervalSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  public readonly timer$: Observable<null> = this.intervalSubject.asObservable();
  private interval: any;

  public add(webhook: Webhook): void {
    this._webhooks.add(webhook);
    this.emit();
  }

  public remove(webhook: Webhook): void {
    this._webhooks.delete(webhook);
    this.emit();
  }

  public startInterval() {
    this.interval = setInterval(() => {
      this.intervalSubject.next(null);
    }, 60000)
  }

  public clearTimer() {
    if(this.interval) {
      clearInterval(this.interval)
    }
  }

  private emit(): void {
    this.webhooksSubject.next(this._webhooks);
  }
}
