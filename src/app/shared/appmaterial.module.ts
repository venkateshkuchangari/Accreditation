import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { ModalService } from './modal/modal.service';
import { ConfirmModalComponent } from './modal/confirm.modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatBadgeModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';






const materialModules = [
  CommonModule,
  MatButtonModule,
  MatDividerModule,
  MatTabsModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule,
  MatExpansionModule,
  MatRadioModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatStepperModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  FormsModule,
  ReactiveFormsModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule
];

@NgModule({
  declarations: [ConfirmModalComponent],
  exports: [
    ...materialModules
  ],
  imports: [
    ...materialModules
  ],
  entryComponents: [ConfirmModalComponent],
  providers: [ModalService]
})
export class AppMaterialModule {
}