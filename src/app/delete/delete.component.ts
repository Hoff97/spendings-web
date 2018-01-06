import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>) { }

  ngOnInit() {
  }

  delete(){
    /*this.spendingService.signUp(this.email,this.pw)
      .subscribe(x => {
        this.dialogRef.close();
      });*/
  }

  cancel(){
    this.dialogRef.close();
  }
}
