import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Spending } from '../spending';
import { Category } from '../category';
import { SpendingService } from '../spending.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  spending: Spending;
  categories: Category[];

  constructor(public dialogRef: MatDialogRef<EditComponent>,
              private spendingService: SpendingService,
              @Inject(MAT_DIALOG_DATA) public data: Spending) {
    this.spending = data;
    this.categories = [];
  }

  ngOnInit() {
    this.loadCategories();
  }

  cancel() {
    this.dialogRef.close();
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
        this.spendingService.updateSpending(this.spending.id,toSave.categoryFk, toSave.amount, toSave.date, toSave.description)
          .subscribe(x => this.dialogRef.close());
        return;
      }
    }

    this.spendingService.saveCategory(this.spending.category.name)
      .subscribe(x => {
        this.spendingService.updateSpending(this.spending.id, x.id, toSave.amount, toSave.date, toSave.description)
          .subscribe(x => {
            this.dialogRef.close();
          });
      });
  }
}
