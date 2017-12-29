import { Injectable } from '@angular/core';

import { Filter } from './filter/filter.component';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilterService {
  filters: Subject<Observable<Filter>>;
  filter: Observable<Filter>;

  constructor() {
    this.filters = new Subject();
    this.filter = this.filters.asObservable().mergeAll();
  }

  addFilters(filter: Observable<Filter>) {
    this.filters.next(filter);
  }
}
