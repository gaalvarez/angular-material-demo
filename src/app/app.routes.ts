import { Routes } from '@angular/router';
import { AdministrarRoutes } from "./administrar/administrar.routes";

export const routes: Routes = [
  ...AdministrarRoutes
  //{ path: '**', component: AdministrarRoutes }
];
