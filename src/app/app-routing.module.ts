import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterGuard} from "./guards/register.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    canActivate: [RegisterGuard],
    loadChildren: () => import("./pages/dashboard/dashboard.module").then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
