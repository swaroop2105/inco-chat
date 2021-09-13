import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';



const materials = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatBadgeModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTabsModule,
  MatRadioModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materials
  ],
  exports: [
    materials
  ]
})
export class MaterialModule { }
