import { Component, OnInit, Input, Output } from '@angular/core';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import {FilterService} from '../filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  categories: [String];

  filter: Observable<Filter>;

  search = new FormControl();
  fromD = new FormControl();
  toD = new FormControl();

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.categories = ["All","Unterhaltung","Essen"];

    this.filter = Observable.combineLatest(this.search.valueChanges,Observable.combineLatest(this.fromD.valueChanges,this.toD.valueChanges))
      .map(x => {return {search: x[0],fromD: x[1][0], toD: x[1][0]}})
      .debounceTime(500);

    this.search.setValue("");
    this.fromD.setValue(new Date());
    this.toD.setValue(new Date());

    this.filterService.addFilters(this.filter);
  }
}

export interface Filter {
  search: String;
  fromD: String;
  toD: String;
}
