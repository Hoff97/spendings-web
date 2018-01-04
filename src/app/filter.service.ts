import { Injectable } from '@angular/core';

import { Filter } from './filter/filter.component';

import { Observable, Scheduler } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilterService {
  filters: Subject<Filter>;
  filter: Observable<Filter>;

  constructor() {
    this.filters = new Subject();
    this.filter = this.filters.asObservable();
  }

  addFilters(filter: Filter) {
    this.filters.next(filter);
  }
}
