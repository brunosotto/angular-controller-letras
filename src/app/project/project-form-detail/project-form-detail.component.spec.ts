import { ProjectServiceMock } from './../../../../mock/project.service.mock';
import { ProjectService } from './../project.service';
import { ProjectFormComponent } from './../project-form/project-form.component';
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
import { ProjectFormDetailComponent } from './project-form-detail.component';
import { Project } from '../../models/project.model';
import { ProjectComponent } from '../project.component';

describe('ProjectFormDetailComponent', () => {
  let component: ProjectFormDetailComponent;
  let fixture: ComponentFixture<ProjectFormDetailComponent>;

  const project: Project = {
    id: '6gf546fd45',
    name: 'Bruno Sotto'
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
        ProjectFormComponent,
        ProjectComponent,
        ProjectFormDetailComponent
      ],
      providers: [
        UtilityService,
        { provide: ProjectService, useClass: ProjectServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: DialogService, useClass: DialogServiceMock },
        MatSnackBar,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormDetailComponent);
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
    (component as any).project = project;
    component.ngOnInit();
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should loadForm onSubmit invalid', () => {
    const of: Project = { ...project };
    (component as any).project = of;
    component.ngOnInit();
    component.edit();
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should cancelar', () => {
    (component as any).project = project;
    component.cancel();
    expect(component).toBeTruthy();
  });

  it('should editar', () => {
    component.edit();
    expect(component).toBeTruthy();
  });
});
