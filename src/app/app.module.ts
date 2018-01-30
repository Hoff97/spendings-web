import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { OverviewComponent } from './overview/overview.component';
import { ConclusionComponent } from './conclusion/conclusion.component';
import { FilterComponent } from './filter/filter.component';

import { MaterialImportModule } from './material-import/material-import.module';
import { HttpClientModule } from '@angular/common/http';

import { SpendingService } from './spending.service';
import { FilterService } from './filter.service';
import { MessageService } from './message.service';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CommonModule } from '@angular/common';
import { ErrorExplainComponent } from './error-explain/error-explain.component';

import { ngfModule } from "angular-file";

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ConclusionComponent,
    FilterComponent,
    LoginComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    ErrorExplainComponent
  ],
  entryComponents: [
    LoginComponent,
    EditComponent,
    DeleteComponent,
    ErrorExplainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    CommonModule,
    ngfModule
  ],
  providers: [SpendingService, FilterService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
