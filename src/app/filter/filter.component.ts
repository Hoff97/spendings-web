import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  categories: [String];

  constructor() { }

  ngOnInit() {
    this.categories = ["All","Unterhaltun","Essen"];
  }
}
