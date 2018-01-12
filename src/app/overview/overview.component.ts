import { Component, OnInit, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Spending } from '../spending';
import { SpendingService } from '../spending.service';
import {Observable} from 'rxjs/Rx';

import {Filter} from '../filter/filter.component'
import { FilterService } from '../filter.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-overview',
  styleUrls: ['overview.component.css'],
  templateUrl: 'overview.component.html',
})
export class OverviewComponent {
  constructor(private spendingService: SpendingService,
              private filterService: FilterService,
             public dialog: MatDialog) {}

  filter: Observable<Filter>;
  page = 0;
  sort = "id";
  sortDir = true;

  displayedColumns = ['id','date','category','amount','description', 'buttons'];
  dataSource = new MatTableDataSource([]);

  searchField = "";
  from = new Date();
  to = new Date();
  category = {id: -1, name: "", parent: 0};

  pageSize = 25;
  total = 0;

  ngOnInit() {
    this.from.setDate(1);

    this.filter = this.filterService.filter;
    this.filter
      .flatMap(x => {
        this.searchField = x.search;
        this.from = x.from;
        this.to = x.to;
        this.category = x.category;
        return this.spendingService.getSpendings(x.search,x.from,x.to,this.page, this.pageSize, this.sort, this.sortDir, this.category.id);
      })
      .subscribe(x => {
        this.total = x.total;
        this.dataSource.data = x.result;
      });
  }

  loadPage(ev) {
    console.log("hi");
    this.page = ev.pageIndex;
    this.pageSize = ev.pageSize;
    this.search();
  }

  search() {
    this.spendingService.getSpendings(this.searchField,this.from,this.to,this.page, this.pageSize,this.sort, this.sortDir,this.category.id)
      .subscribe(x => {
        this.total = x.total;
        this.dataSource.data = x.result;
      });
  }

  sortData(ev) {
    console.log(ev);
    this.sort = ev.active;
    this.sortDir = ev.direction === "asc";
    this.search();
  }

  edit(spend: Spending) {
    let dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: spend
    });

    dialogRef.afterClosed().subscribe(x => {
      this.search();
    });
  }

  delete(spend: Spending) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px',
      data: spend
    });

    dialogRef.afterClosed().subscribe(x => {
      this.search();
    });
  }
}
