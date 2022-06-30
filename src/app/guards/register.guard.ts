import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, tap} from "rxjs";
import {MyConfigService} from "../services/my-config.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class RegisterGuard implements CanActivate {
  constructor(
    private myConfigService: MyConfigService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.myConfigService.setSubdomain(route.queryParams['subdomain'])
    return this.myConfigService.config$.pipe(
      map(config => !!config.subdomain),
      tap(hasConfig => {
        if(!hasConfig) {
          window.location.href = environment.homeSiteUrl;
        }
      })
    )
  }
}
