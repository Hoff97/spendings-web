import { Injectable } from '@angular/core';

import { Filter } from './filter/filter.component';

import { Observable, Scheduler } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilterService {
  filters: Subject<Filter>;
  filter: Observable<Filter>;

  categories: Subject<string>;
  category: Observable<string>;

  constructor() {
    this.filters = new Subject();
    this.filter = this.filters.asObservable();
    this.categories = new Subject();
    this.category = this.categories.asObservable();
  }

  addFilters(filter: Filter) {
    this.filters.next(filter);
  }

  setCategory(name: string) {
    this.categories.next(name);
  }
}
