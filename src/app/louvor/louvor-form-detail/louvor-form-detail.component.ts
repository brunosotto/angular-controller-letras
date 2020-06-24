import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Louvor } from '../../models/louvor.model';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-louvor-form-detail',
  templateUrl: './louvor-form-detail.component.html',
  styleUrls: ['./louvor-form-detail.component.scss']
})
export class LouvorFormDetailComponent implements OnInit {
  @Input() private readonly louvor: Louvor;
  @Output() private readonly apply: EventEmitter<Louvor> = new EventEmitter<Louvor>();

  private _louvorForm: FormGroup;
  private _editing: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly util: UtilityService,
  ) {
    this.createForm();
    this._editing = false;
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
    this.loadForm();
    this.lockFields();
  }

  public get louvorForm(): FormGroup {
    return this._louvorForm;
  }

  public get editing(): boolean {
    return this._editing;
  }

  private loadForm(): void {
    if (!this.louvor) {
      return;
    }

    this.louvorForm.reset({
      name: this.louvor.name,
      text: this.louvor.text
    });
  }

  public onSubmit(): void {
    if (this.louvorForm.invalid) {
      return;
    }

    const louvor = this.prepareSave();
    this.apply.emit(louvor);
  }

  private prepareSave(): Louvor {
    const formModel = this.louvorForm.value;

    const save: Louvor = {
      id: this.louvor.id,
      name: this.util.trimPreventNull(formModel.name as string),
      text: this.util.trimPreventNull(formModel.text as string),
      arr: null
    };

    return save;
  }

  public cancel(): void {
    this._editing = false;

    this.loadForm();
    this.lockFields();
  }

  public edit(): void {
    this._editing = true;

    this.unlockFields();
  }

  private lockFields(): void {
    // disabilita campos
    this.louvorForm.get('name').disable();
    this.louvorForm.get('text').disable();
  }

  private unlockFields(): void {
    // disabilita campos
    this.louvorForm.get('name').enable();
    this.louvorForm.get('text').enable();
  }

}
