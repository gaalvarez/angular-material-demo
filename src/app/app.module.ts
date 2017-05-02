import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, } from './app.component';
import { routes } from './app.routes';
import { LayoutModule } from './layout/layout.module';
import { AdministrarModule } from './administrar/administrar.module';

@NgModule({
  imports: [
    AdministrarModule,
    LayoutModule,
    BrowserModule,
    RouterModule.forRoot(routes)
    //BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
