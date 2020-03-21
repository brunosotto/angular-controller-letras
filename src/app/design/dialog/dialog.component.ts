import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dialog } from './dialog.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public dialogForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: Dialog,
    private readonly fb: FormBuilder,
    private readonly util: UtilityService
  ) {
    this.createForm();
  }

  public get dialogData(): Dialog {
    return this.data;
  }

  private createForm(): void {
    this.dialogForm = this.fb.group({
      textarea: this.validatorsTextArea()
    });
  }

  private validatorsTextArea(): any[] {
    const initialValue = this.data.textareaValue;

    if (this.data.textareaRequired) {
      return [initialValue, Validators.required, this.util.validaEspacoAsync()];
    } else {
      return [initialValue];
    }
  }

  public ngOnInit(): void {
    // init
  }

  public dialogClose(result?: any): void {
    // se é um undefined passa sem verificar
    if (result === undefined) {
      this.dialogRef.close(result);
    }

    // ve se o textarea é requerido e o formulário é valido
    if (this.data.textarea && this.data.textareaRequired && this.dialogForm.invalid) {
      return;
    }

    // pega o dado se tem
    if (this.data.textarea) {
      const formModel = this.dialogForm.value;
      this.data.textareaValue = this.util.trimPreventNull(formModel.textarea as string);
    }

    // retorna fechando a dialog
    this.dialogRef.close(result);
  }

}
