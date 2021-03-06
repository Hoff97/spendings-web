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

  tabIndex: number;

  @ViewChild('addTab') addTab;
  @ViewChild('conclusionTab') conclusionTab;
  @ViewChild('overviewTab') overviewTab;
  @ViewChild('filterTab') filterTab;

  constructor(public dialog: MatDialog){}

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(x => {
      this.overviewTab.search();
      this.filterTab.load();
    })
  }

  ngAfterViewInit() {
    this.openDialog();
  }

  tabChange() {
    switch(this.tabIndex) {
    case 0: this.overviewTab.search();this.filterTab.load();break;
    case 1: this.conclusionTab.load();break;
    case 2: this.addTab.loadCategories();break;
    }
  }

  switchOverview(ev) {
    console.log(ev);
    console.log("yay");
    this.tabIndex = 0;
  }
}
