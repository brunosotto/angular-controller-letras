import { UtilityService } from './../../utility.service';
import { HttpConnectorServiceMock } from './../../../../mock/http-connector.service.mock';
import { DialogServiceMock } from './../../../../mock/dialog.service.mock';
import { DialogService } from './../../design/dialog/dialog.service';
import { MascarasModule } from './../../masks/mascaras.module';
import { DesignModule } from './../../design/design.module';
import { HttpConnectorService } from './../../security/http-connector.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatDialogModule, MatDialogRef } from '@angular/material';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectFormComponent } from './project-form.component';
import { CommonModule } from '@angular/common';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;

  beforeEach(async(() => {
    const fakeRoutes: Routes = [];

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(fakeRoutes),
        MascarasModule,
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        DesignModule
      ],
      declarations: [
        ProjectFormComponent
      ],
      providers: [
        MatSnackBar,
        { provide: DialogService, useClass: DialogServiceMock },
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        UtilityService,
        {
          provide: MatDialogRef, useValue: {
            close: (dialogResult: any) => {
              // dialogResult
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormComponent);
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

  it('should onSubmit', () => {
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should onSubmit valid', () => {
    // preenche o form
    component.projectForm.controls.name.setValue('Bruno Sotto');
    component.projectForm.controls.phone.setValue('(11) 94863-9694');
    component.projectForm.controls.documentNumber.setValue('325.508.588-83');

    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
