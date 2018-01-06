import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';

import {Observable} from 'rxjs/Rx';

import {Filter, FilterComponent } from './filter/filter.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  @ViewChild('addTab') addTab;

  constructor(public dialog: MatDialog){}

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent, {width: '250px'});
  }

  ngAfterViewInit() {
    this.openDialog();
  }

  tabChange() {
    this.addTab.loadCategories();
  }
}
