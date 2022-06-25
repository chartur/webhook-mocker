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

  public add(webhook: Webhook): void {
    this._webhooks.add(webhook);
    this.emit();
  }

  public remove(webhook: Webhook): void {
    this._webhooks.delete(webhook);
    this.emit();
  }

  private emit(): void {
    this.webhooksSubject.next(this._webhooks);
  }
}
