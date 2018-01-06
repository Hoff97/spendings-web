import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { OverviewComponent } from './overview/overview.component';
import { ConclusionComponent } from './conclusion/conclusion.component';
import { FilterComponent } from './filter/filter.component';

import { MaterialImportModule } from './material-import/material-import.module';
import { HttpClientModule } from '@angular/common/http';

import { SpendingService } from './spending.service';
import { FilterService } from './filter.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ConclusionComponent,
    FilterComponent,
    LoginComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [SpendingService,FilterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
