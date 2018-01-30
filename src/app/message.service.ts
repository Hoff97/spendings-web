import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material';

import { Message } from './message';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorExplainComponent } from './error-explain/error-explain.component';


@Injectable()
export class MessageService {

  private subject = new Subject<any>();

  public messages: Observable<string>;

  constructor(public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.messages = this.subject.asObservable();
  }

  sendMessage(message: Message) {
    this.subject.next({ text: message });
    if (message.type == "success") {
      this.snackBar.open(message.short, "", { duration: 2500 });
    } else if (message.type == "error") {
      let snack = this.snackBar.open(message.short, "Why?", {
        duration: 5000
      });

      snack.afterDismissed().subscribe(x => {
        let dialogRef = this.dialog.open(ErrorExplainComponent, { width: '600px', data: message.long });
      });
    }
  }
}
