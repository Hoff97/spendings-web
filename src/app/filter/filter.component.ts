import { Component, OnInit, Input, Output } from '@angular/core';

import {Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { Scheduler } from 'rxjs/Rx';

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

  private obs = new Subject();

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.categories = ["All","Unterhaltung","Essen"];

    this.search.setValue("");
    this.fromD.setValue(new Date());
    this.toD.setValue(new Date());

    this.filter = this.obs.asObservable()
      .map(x => {return {search: this.search.value, from: this.fromD.value, to: this.toD.value}});
    this.filter.forEach(x => {this.filterService.addFilters(x)});
  }
}

export interface Filter {
  search: String;
  from: Date;
  to: Date;
}
