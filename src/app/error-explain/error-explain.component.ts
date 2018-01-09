import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-error-explain',
  templateUrl: './error-explain.component.html',
  styleUrls: ['./error-explain.component.css']
})
export class ErrorExplainComponent implements OnInit {
  private error: string;

  constructor(public dialogRef: MatDialogRef<ErrorExplainComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.error = JSON.stringify(data);
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
