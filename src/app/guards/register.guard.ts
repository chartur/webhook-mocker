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
  ): boolean {
    const subdomain = route.queryParams['subdomain'];
    if(!subdomain) {
      window.location.href = environment.homeSiteUrl;
      return false;
    }

    this.myConfigService.setSubdomain(route.queryParams['subdomain'])
    return true;
  }
}
