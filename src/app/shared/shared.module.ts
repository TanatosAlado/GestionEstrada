import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';





@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule, MatDividerModule, MatSnackBarModule, MatTooltipModule, MatBadgeModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatOptionModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule, MatDividerModule, MatSnackBarModule, MatTooltipModule, MatBadgeModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatOptionModule
  ]
})
export class SharedModule { }
