import { Component, OnInit, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Spending } from '../spending';
import { SpendingService } from '../spending.service';
import {Observable} from 'rxjs/Rx';

import {Filter} from '../filter/filter.component'
import { FilterService } from '../filter.service';
/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-overview',
  styleUrls: ['overview.component.css'],
  templateUrl: 'overview.component.html',
})
export class OverviewComponent {
  constructor(private spendingService: SpendingService,
              private filterService: FilterService) {}

  filter: Observable<Filter>;

  displayedColumns = ['id','date','category','amount','description'];
  dataSource = new MatTableDataSource([]);

  ngOnInit() {
    this.filter = this.filterService.filter;
    this.filter
      .flatMap(x => {
        return this.spendingService.getSpendings(x.search,x.fromD.toString(),x.toD.toString());
      })
      .forEach(x => {
        this.dataSource.data = x;
        console.log(x);
      });
  }
}
