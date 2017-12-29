import { Component, ViewChild, AfterViewInit } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';

import {Observable} from 'rxjs/Rx';

import {Filter, FilterComponent } from './filter/filter.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
