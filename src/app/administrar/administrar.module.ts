import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//componentes y rutas
import { AdministrarRoutes } from './administrar.routes';
import { AdministrarComponent } from './administrar.component';
import { ZonaComponent } from "./zona/zona.component";
import { TipoZonaComponent } from "./tipo-zona/tipo-zona.component";
import { SearcherTipoZonaComponent } from "./searchers/searcher-tipo-zona/searcher-tipo-zona.component";
import { SearcherZonaComponent } from "./searchers/searcher-zona/searcher-zona.component";
//import {UtilModule} from '../util/util.module';
import { MaterialModule } from "@angular/material";
import {
  NotificationsService,
  SimpleNotificationsModule
} from 'angular2-notifications'; // https://github.com/flauc/angular2-notifications
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
//servicios
import { ParametroService } from "../services/parametro.service";
import { TipoZonaService } from "../services/tipo-zona.service";
import { ZonaService } from "../services/zona.service";
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forRoot(AdministrarRoutes),
    MaterialModule,
    FormsModule,
    Ng2SmartTableModule,
    LayoutModule,
    SimpleNotificationsModule
    //  UtilModule
  ],
  providers: [
    ParametroService,
    TipoZonaService,
    ZonaService,
    NotificationsService,
    NgbPaginationConfig
  ],
  declarations: [
    AdministrarComponent,
    ZonaComponent,
    TipoZonaComponent,
    SearcherZonaComponent,
    SearcherTipoZonaComponent
  ],
  exports: [
    AdministrarComponent,
    ZonaComponent,
    TipoZonaComponent
  ],
  entryComponents: [
    SearcherZonaComponent, 
    SearcherTipoZonaComponent
  ]
})
export class AdministrarModule { }
