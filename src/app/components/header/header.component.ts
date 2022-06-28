import {Component, OnDestroy, OnInit} from "@angular/core";
import {filter, fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'webhooker-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})

export class HeaderComponent implements OnInit, OnDestroy {
  public showAccountDropdown: boolean = false;
  private subscriptions: Subscription[] = [];


  constructor() {
  }

  ngOnInit() {
    this.subscriptions.push(
      fromEvent(document, "click")
        .pipe(
          filter(() => this.showAccountDropdown)
        )
        .subscribe((_) => {
          this.showAccountDropdown = false;
        })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription?.unsubscribe());
  }

  public toggleAccountDropdown(ev: Event): void {
    ev.stopPropagation();
    this.showAccountDropdown = !this.showAccountDropdown;
  }
}
