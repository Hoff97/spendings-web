import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AmexioWidgetModule, CommonHttpService } from 'amexio-ng-extensions';
import { OverviewComponent } from './overview/overview.component';
import { ConclusionComponent } from './conclusion/conclusion.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ConclusionComponent
  ],
  imports: [
    BrowserModule,
    AmexioWidgetModule
  ],
  providers: [CommonHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
