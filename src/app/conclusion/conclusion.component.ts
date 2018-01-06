import { Component, OnInit } from '@angular/core';

import { SpendingService } from '../spending.service';
import { FilterService } from '../filter.service';
import {Observable} from 'rxjs/Rx';
import {Filter} from '../filter/filter.component'
import { Sum } from '../sum';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css']
})
export class ConclusionComponent implements OnInit {
  values = [];

  sums: Sum[] = [];

  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private spendingService: SpendingService,
              private filterService: FilterService) {
  }

  filter: Observable<Filter>;

  from = new Date();
  to = new Date();

  ngOnInit() {
    this.from.setDate(1);

    this.filter = this.filterService.filter;
    this.filter
      .flatMap(x => {
        this.from = x.from;
        this.to = x.to;
        return this.spendingService.sumSpendings(x.from,x.to);
      })
      .subscribe(x => {
        this.mapSums(x);
      });

    this.load();
  }

  mapSums(sums: Sum[]) {
    this.values = [];
    this.sums = sums;
    for(var sum of sums) {
      this.values.unshift({ name: sum.name, value: sum.sum });
    }
  }

  load() {
    this.spendingService.sumSpendings(this.from,this.to)
      .subscribe(x => {
        this.mapSums(x);
      });
  }

  onSelect(event) {
    console.log(event);
  }
}
