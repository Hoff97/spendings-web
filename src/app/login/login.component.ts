import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SpendingService } from '../spending.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  email = "a@a.a";
  pw = "aaa";

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private spendingService: SpendingService) { }

  ngOnInit() {
  }

  login() {
    this.spendingService.login(this.email,this.pw)
      .subscribe(x => {
        this.dialogRef.close();
      });
  }

  signUp(){
    this.spendingService.signUp(this.email,this.pw)
      .subscribe(x => {
        this.dialogRef.close();
      });
  }
}
