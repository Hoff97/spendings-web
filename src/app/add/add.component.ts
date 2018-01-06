import { Component, OnInit } from '@angular/core';

import { Spending } from '../spending';
import { Category } from '../category';
import { SpendingService } from '../spending.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  spending: Spending;
  categories: Category[];

  constructor(private spendingService: SpendingService) {
    this.reset();
    this.categories = [];
  }

  ngOnInit() { }

  reset() {
    this.spending = {
      id: 0, amount: 0, category: {
        id: 0, name: "", parent: 0
      }, description: "", date: new Date()
    }
  }

  loadCategories() {
    this.spendingService.getCategories().subscribe(x => {
      this.categories = x;
    });
  }

  save() {
    let toSave = {
      amount: this.spending.amount,
      categoryFk: 0,
      date: this.spending.date,
      description: this.spending.description
    }

    for(var category of this.categories) {
      if(category.name === this.spending.category.name) {
        toSave.categoryFk = category.id;
        this.spendingService.saveSpending(toSave.categoryFk, toSave.amount, toSave.date, toSave.description)
          .subscribe(x => this.reset());
        this.reset();
        return;
      }
    }

    this.spendingService.saveCategory(this.spending.category.name)
      .subscribe(x => {
        this.spendingService.saveSpending(x.id, toSave.amount, toSave.date, toSave.description)
          .subscribe(x => {
            this.reset();
            this.loadCategories();
          });
      });
  }
}
