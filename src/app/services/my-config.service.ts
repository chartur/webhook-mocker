import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Config} from "../models/config";

@Injectable({
  providedIn: 'root'
})

export class MyConfigService {
  private configSubject: BehaviorSubject<Partial<Config>> = new BehaviorSubject<Partial<Config>>({})
  public readonly config$: Observable<Partial<Config>> = this.configSubject.asObservable();

  constructor() {}

  setSubdomain(subdomain: string): void {
    const config = this.configSubject.getValue();
    config.subdomain = subdomain;
    this.configSubject.next(config);
  }
}
