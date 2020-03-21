import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconXComponent } from './../icon-x/icon-x.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilityService } from '../../utility.service';
import { Dialog } from './dialog.model';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  const massa1: Dialog = {
    titulo: 'teste 1',
    texto: 'teste texto 1',
    hint: 'teste hint 1',
    textarea: false,
    textareaLabel: 'label do textarea',
    textareaValue: 'value do textarea',
    textareaRequired: true,
    textareaRequiredErrorText: 'em caso de erro',
    disableClose: true
  };

  const massa2: Dialog = {
    titulo: 'teste 1',
    texto: 'teste texto 1',
    hint: 'teste hint 1',
    textarea: true,
    textareaLabel: 'label do textarea',
    textareaValue: 'value do textarea',
    textareaRequired: false,
    textareaRequiredErrorText: 'em caso de erro',
    disableClose: true
  };

  const data: Dialog[] = [
    massa1,
    massa2,
    massa2,
    massa2
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DialogComponent,
        IconXComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data.shift() },
        {
          provide: MatDialogRef, useValue: {
            close: (dialogResult: any) => {
              // dialogResult
            }
          }
        },
        UtilityService
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create massa 1', () => {
    expect(component).toBeTruthy();
  });

  it('should textareaRequired false massa 2', () => {
    expect(component).toBeTruthy();
  });

  it('should dialogClose undefined massa 2', () => {
    component.dialogClose(undefined);
    expect(component).toBeTruthy();
  });

  it('should dialogClose "ok" massa 2', () => {
    component.dialogClose('ok');
    expect(component).toBeTruthy();
  });

});
