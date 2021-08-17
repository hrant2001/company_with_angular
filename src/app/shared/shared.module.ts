import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

const matModules = [MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTabsModule, MatButtonModule, MatDialogModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...matModules
  ],
  exports: [
    ...matModules
  ]
})
export class SharedModule { }
