import { LouvorServiceMock } from './../../../../mock/louvor.service.mock';
import { LouvorService } from './../louvor.service';
import { LouvorFormComponent } from './../louvor-form/louvor-form.component';
import { DialogServiceMock } from './../../../../mock/dialog.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilityService } from './../../utility.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MascarasModule } from './../../masks/mascaras.module';
import { MatDialogModule, MatDialog, MatSnackBar } from '@angular/material';
import { DesignModule } from '../../design/design.module';
import { DialogService } from '../../design/dialog/dialog.service';
import { MatDialogMock } from '../../../../mock/mat-dialog.mock';
import { HttpConnectorService } from '../../security/http-connector.service';
import { HttpConnectorServiceMock } from '../../../../mock/http-connector.service.mock';
import { LouvorShowComponent } from './louvor-show.component';
import { Louvor } from '../../models/louvor.model';
import { LouvorComponent } from '../louvor.component';

describe('LouvorShowComponent', () => {
  let component: LouvorShowComponent;
  let fixture: ComponentFixture<LouvorShowComponent>;

  const louvor: Louvor = {
    id: '6gf546fd45',
    name: 'AAA',
    text: 'BBB'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MascarasModule,
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        DesignModule
      ],
      declarations: [
        LouvorFormComponent,
        LouvorComponent,
        LouvorShowComponent
      ],
      providers: [
        UtilityService,
        { provide: LouvorService, useClass: LouvorServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: DialogService, useClass: DialogServiceMock },
        MatSnackBar,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LouvorShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    const spyNgOnInit = spyOn(component, 'ngOnInit');

    component.ngOnInit();

    expect(() => component.ngOnInit()).not.toThrow();

    expect(spyNgOnInit).toHaveBeenCalled();
  });

  it('should loadForm onSubmit', () => {
    (component as any).louvor = louvor;
    component.ngOnInit();
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should loadForm onSubmit invalid', () => {
    const of: Louvor = { ...louvor };
    (component as any).louvor = of;
    component.ngOnInit();
    component.edit();
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should cancelar', () => {
    (component as any).louvor = louvor;
    component.cancel();
    expect(component).toBeTruthy();
  });

  it('should editar', () => {
    component.edit();
    expect(component).toBeTruthy();
  });
});
