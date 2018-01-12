import { Component, OnInit, Input } from '@angular/core';

import {Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { Scheduler } from 'rxjs/Rx';

import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import {FilterService} from '../filter.service';
import { SpendingService } from '../spending.service';
import { Category } from '../category';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  categories: Category[];

  @Input("hasSearch")
  hasSearch: boolean = true;

  filter: Observable<Filter>;

  search = new FormControl();
  fromD = new FormControl();
  toD = new FormControl();
  category = new FormControl();

  private obs = new Subject();

  constructor(private filterService: FilterService,
              private spendingService: SpendingService) {}

  ngOnInit() {
    this.categories = [];

    this.search.setValue("");
    let from = new Date();
    from.setDate(1);
    this.fromD.setValue(from);
    this.toD.setValue(new Date());

    this.filter = this.obs.asObservable()
      .map(x => {return {search: this.search.value, from: this.fromD.value, to: this.toD.value, category: this.category.value}});
    this.filter.forEach(x => {this.filterService.addFilters(x)});

    this.filterService.category.subscribe(x => {
      for(let cat of this.categories) {
        if(cat.name == x) {
          this.category.setValue(cat);
          this.filterService.addFilters({search: this.search.value, from: this.fromD.value, to: this.toD.value, category: this.category.value});
        }
      }
    });
  }

  load() {
    this.spendingService.getCategories().subscribe(x => {
      this.categories = x;
    });
  }
}

export interface Filter {
  search: string;
  from: Date;
  to: Date;
  category: Category;
}
