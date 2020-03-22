import { Project } from './../models/project.model';
import { ProjectServiceMock } from './../../../mock/project.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MascarasModule } from './../masks/mascaras.module';
import { DialogServiceMock } from './../../../mock/dialog.service.mock';
import { DesignModule } from './../design/design.module';
import { MatDialogMock } from './../../../mock/mat-dialog.mock';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { Renderer } from '@angular/core';
import { ProjectService } from './project.service';
import { MatDialog, MatSnackBar, MatDialogModule } from '@angular/material';
import { DialogService } from '../design/dialog/dialog.service';
import { Routes, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpConnectorService } from '../security/http-connector.service';
import { HttpConnectorServiceMock } from '../../../mock/http-connector.service.mock';
import { UtilityService } from '../utility.service';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectFormDetailComponent } from './project-form-detail/project-form-detail.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { of } from 'rxjs';

const project: Project = {
  id: '1234',
  name: 'Bruno',
  documentNumber: '325',
  phone: '(11) 94863-9694',
  auctioneer: '12345'
};

const fakeActivatedRoutesData = {
  ProjectsRoute: {
    path: 'frotapropria',
    data: { page: 1, id: '*' },
    url: [{ path: 'frotapropria' }]
  },
  ProjectsSearchRoute: {
    path: 'frotapropria-s',
    data: { page: 1, id: '*', option: 'auctioneer', value: '12345' },
    url: [{ path: 'frotapropria-s' }]
  }
};

const fakeRoutes: Routes = [
  { path: 'frotapropria', redirectTo: '/frotapropria/1/*', pathMatch: 'full' },
  { path: 'frotapropria/:page', redirectTo: '/frotapropria/:page/*', pathMatch: 'full' },
  { path: 'frotapropria/:page/:id', component: ProjectComponent, data: fakeActivatedRoutesData.ProjectsRoute.data },

  // frotapropria - search
  { path: 'frotapropria-s/:option/:value', redirectTo: '/frotapropria-s/:option/:value/1/*', pathMatch: 'full' },
  { path: 'frotapropria-s/:option/:value/:page', redirectTo: '/frotapropria-s/:option/:value/:page/*', pathMatch: 'full' },
  { path: 'frotapropria-s/:option/:value/:page/:id', component: ProjectComponent, data: fakeActivatedRoutesData.ProjectsSearchRoute.data },
];

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectComponent,
        ProjectFormDetailComponent,
        ProjectFormComponent
      ],
      providers: [
        Renderer,
        { provide: ProjectService, useClass: ProjectServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: DialogService, useClass: DialogServiceMock },
        MatSnackBar,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        UtilityService,
        { // ActivatedRoute
          provide: ActivatedRoute,
          useValue: {
            params: of(fakeActivatedRoutesData.ProjectsRoute.data),
            snapshot: {
              params: { ...fakeActivatedRoutesData.ProjectsRoute.data, page: 2 } // força snapshot com page 2 para ter isChanged
            },
            url: of(fakeActivatedRoutesData.ProjectsRoute.url),
          }
        }
      ],
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
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

  it('should isLoading', () => {
    (component as any)._projects = [project];
    component.isLoading = true;
    expect(component).toBeTruthy();
  });

  it('should treatPageNumber page null', () => {
    const params = {
      page: null
    };
    const page = (component as any).treatPageNumber(params);
    expect(page).toBe(1);
  });

  it('should treatPageNumber page NaN', () => {
    const params = {
      page: 'y'
    };
    const page = (component as any).treatPageNumber(params);
    expect(page).toBe(1);
  });

  it('should treatPageNumber page 5', () => {
    const params = {
      page: '5'
    };
    const page = (component as any).treatPageNumber(params);
    expect(page).toBe(5);
  });

  it('should be expanded', () => {
    const val = '1234';

    (component as any)._expanded = val;
    expect(component.expanded).toBe(val);
  });

  it('should be detail', () => {
    component.detail(project);
    expect(component).toBeTruthy();
  });

  it('should be detail contrai', () => {
    (component as any)._expanded = project.id;
    component.detail(project);
    expect(component).toBeTruthy();
  });

  it('should be onChangePage', () => {
    component.onChangePage(2);
    expect(component).toBeTruthy();
  });

  it('should be novaProject dialog null', inject(
    [MatDialog],
    (dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = null;
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      component.newProject();
      expect(component).toBeTruthy();

    }
  ));

  it('should be novaProject dialog project id existente', inject(
    [MatDialog],
    (dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = { ...project };
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      component.newProject();
      expect(component).toBeTruthy();

    }
  ));

  it('should be novaProject dialog project id null', inject(
    [MatDialog],
    (dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = { ...project, id: null };
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      component.newProject();
      expect(component).toBeTruthy();

    }
  ));

  it('should be novaProject success false', inject(
    [ProjectService, MatDialog],
    (service: ProjectService, dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = { ...project, id: null };
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      // faz o setup
      const respAdicionaProject = [{ success: false }];
      (service as any).testSetup('respAdicionaProject', respAdicionaProject);

      component.newProject();
      expect(component).toBeTruthy();

    }
  ));

  it('should be novaProject throw error', inject(
    [ProjectService, MatDialog],
    (service: ProjectService, dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = { ...project, id: null };
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      // faz o setup
      const erro = 'falha na requisição';
      const respAdicionaProject = [{ throw: true, error: erro }];
      (service as any).testSetup('respAdicionaProject', respAdicionaProject);

      component.newProject();
      expect(component).toBeTruthy();

    }
  ));

  it('should be delete dialog false', inject(
    [DialogService],
    (dialog: DialogService) => {

      // faz o setup
      const respOpen = [false];
      (dialog as any).testSetup('respOpen', respOpen);

      component.delete(project);
      expect(component).toBeTruthy();

    }
  ));

  it('should be delete dialog true', inject(
    [DialogService],
    (dialog: DialogService) => {

      // faz o setup
      const respOpen = [true];
      (dialog as any).testSetup('respOpen', respOpen);

      component.delete(project);
      expect(component).toBeTruthy();

    }
  ));

  it('should be delete success false', inject(
    [ProjectService],
    (service: ProjectService) => {

      // faz o setup
      const respDeletaProject = [{ success: false }];
      (service as any).testSetup('respDeletaProject', respDeletaProject);

      component.delete(project);
      expect(component).toBeTruthy();

    }
  ));

  it('should be delete throw error', inject(
    [ProjectService],
    (service: ProjectService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respDeletaProject = [{ throw: true, error: erro }];
      (service as any).testSetup('respDeletaProject', respDeletaProject);

      component.delete(project);
      expect(component).toBeTruthy();

    }
  ));
});

// search
describe('ProjectComponent Search', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectComponent,
        ProjectFormDetailComponent,
        ProjectFormComponent
      ],
      providers: [
        Renderer,
        { provide: ProjectService, useClass: ProjectServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: DialogService, useClass: DialogServiceMock },
        MatSnackBar,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        UtilityService,
        { // ActivatedRoute
          provide: ActivatedRoute,
          useValue: {
            params: of(fakeActivatedRoutesData.ProjectsSearchRoute.data),
            snapshot: {
              params: fakeActivatedRoutesData.ProjectsSearchRoute.data
            },
            url: of(fakeActivatedRoutesData.ProjectsSearchRoute.url),
          }
        }
      ],
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be detail search', () => {
    component.detail(project);
    expect(component).toBeTruthy();
  });

  it('should be onChangePage search', () => {
    component.onChangePage(2);
    expect(component).toBeTruthy();
  });
});
