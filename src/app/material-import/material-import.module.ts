import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule, MatCheckboxModule, MatTabsModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatTabsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatTabsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: []
})
export class MaterialImportModule { }
