import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UtilityService } from '../../utility.service';
import { Louvor } from '../../models/louvor.model';

@Component({
  selector: 'app-louvor-form',
  templateUrl: './louvor-form.component.html',
  styleUrls: ['./louvor-form.component.scss']
})
export class LouvorFormComponent implements OnInit {

  private louvor: Louvor;
  private _louvorForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<LouvorFormComponent>,
    private readonly util: UtilityService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this._louvorForm = this.fb.group({
      name: [null, Validators.required, this.util.multiValida([
        this.util.validaEspacoAsync()
      ])],
      text: [null, Validators.required]
    });
  }

  public ngOnInit(): void {
  }

  public get louvorForm(): FormGroup {
    return this._louvorForm;
  }

  public onSubmit(): void {
    if (this.louvorForm.invalid) {
      return;
    }

    this.louvor = this.prepareSave();
    this.dialogClose(this.louvor);
  }

  private prepareSave(): Louvor {
    const formModel = this.louvorForm.value;

    const save: Louvor = {
      id: null,
      name: this.util.trimPreventNull(formModel.name as string),
      text: this.util.trimPreventNull(formModel.text as string),
    };

    return save;
  }

  public dialogClose(louvor?: Louvor): void {
    this.dialogRef.close(louvor);
  }

}
