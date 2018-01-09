import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Spending } from '../spending';
import { SpendingService } from '../spending.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  spending: Spending;

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              private spendingService: SpendingService,
              private messageService: MessageService,
              @Inject(MAT_DIALOG_DATA) public data: Spending) {
    this.spending = data;
  }


  ngOnInit() {
  }

  delete(){
    this.spendingService.deleteSpending(this.spending.id)
      .subscribe(x => {
        this.dialogRef.close();
        this.messageService.sendMessage({ type: "success", short: "Spending deleted", long: ""})
      }, e => {
        this.messageService.sendMessage({ type: "error", short: "Spending could not be deleted", long: e})
      });
  }

  cancel(){
    this.dialogRef.close();
  }
}
