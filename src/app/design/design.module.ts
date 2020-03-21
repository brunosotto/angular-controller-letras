import { IconTrashComponent } from './icon-trash/icon-trash.component';
import { IconChevronComponent } from './icon-chevron/icon-chevron.component';
import { IconPlusComponent } from './icon-plus/icon-plus.component';
import { ContainerComponent } from './container/container.component';
import { DialogService } from './dialog/dialog.service';
import { DialogComponent } from './dialog/dialog.component';
import { IconXComponent } from './icon-x/icon-x.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatRadioModule,
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatExpansionModule
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSectionComponent } from './form-section/form-section.component';
import { UserInfoService } from '../security/user-info.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    IconChevronComponent,
    IconXComponent,
    IconPlusComponent,
    IconTrashComponent,
    DialogComponent,
    ContainerComponent,
    FormSectionComponent
  ],
  exports: [
    MatRadioModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    RouterModule,
    NavbarComponent,
    IconChevronComponent,
    IconXComponent,
    IconPlusComponent,
    IconTrashComponent,
    DialogComponent,
    ContainerComponent,
    FormSectionComponent
  ],
  providers: [
    DialogService,
    UserInfoService
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class DesignModule { }
