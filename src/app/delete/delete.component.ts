import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Spending } from '../spending';
import { SpendingService } from '../spending.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  spending: Spending;

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              private spendingService: SpendingService,
              @Inject(MAT_DIALOG_DATA) public data: Spending) {
    this.spending = data;
  }


  ngOnInit() {
  }

  delete(){
    this.spendingService.deleteSpending(this.spending.id)
      .subscribe(x => {
        this.dialogRef.close();
      });
  }

  cancel(){
    this.dialogRef.close();
  }
}
