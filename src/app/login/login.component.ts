import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SpendingService } from '../spending.service';
import { MessageService } from '../message.service';

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
              private spendingService: SpendingService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  login() {
    this.spendingService.login(this.email,this.pw)
      .subscribe(x => {
        this.dialogRef.close();
      }, e => {
        this.messageService.sendMessage({type: "error", short: "Login failed", long: e});
      });
  }

  signUp(){
    this.spendingService.signUp(this.email,this.pw)
      .subscribe(x => {
        this.dialogRef.close();
      }, e => {
        this.messageService.sendMessage({type: "error", short: "Signup failed", long: e});
      });
  }
}
