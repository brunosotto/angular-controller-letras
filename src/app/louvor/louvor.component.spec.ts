import { Louvor } from './../models/louvor.model';
import { LouvorServiceMock } from './../../../mock/louvor.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MascarasModule } from './../masks/mascaras.module';
import { DialogServiceMock } from './../../../mock/dialog.service.mock';
import { DesignModule } from './../design/design.module';
import { MatDialogMock } from './../../../mock/mat-dialog.mock';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LouvorComponent } from './louvor.component';
import { Renderer2 } from '@angular/core';
import { LouvorService } from './louvor.service';
import { MatDialog, MatSnackBar, MatDialogModule } from '@angular/material';
import { DialogService } from '../design/dialog/dialog.service';
import { Routes, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpConnectorService } from '../security/http-connector.service';
import { HttpConnectorServiceMock } from '../../../mock/http-connector.service.mock';
import { UtilityService } from '../utility.service';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { LouvorFormDetailComponent } from './louvor-form-detail/louvor-form-detail.component';
import { LouvorFormComponent } from './louvor-form/louvor-form.component';
import { of } from 'rxjs';

const louvor: Louvor = {
  id: '1234',
  name: 'AAA',
  text: '325',
};

const fakeActivatedRoutesData = {
  LouvoresRoute: {
    path: 'frotapropria',
    data: { page: 1, id: '*' },
    url: [{ path: 'frotapropria' }]
  },
  LouvoresSearchRoute: {
    path: 'frotapropria-s',
    data: { page: 1, id: '*', option: 'auctioneer', value: '12345' },
    url: [{ path: 'frotapropria-s' }]
  }
};

const fakeRoutes: Routes = [
  { path: 'frotapropria', redirectTo: '/frotapropria/1/*', pathMatch: 'full' },
  { path: 'frotapropria/:page', redirectTo: '/frotapropria/:page/*', pathMatch: 'full' },
  { path: 'frotapropria/:page/:id', component: LouvorComponent, data: fakeActivatedRoutesData.LouvoresRoute.data },

  // frotapropria - search
  { path: 'frotapropria-s/:option/:value', redirectTo: '/frotapropria-s/:option/:value/1/*', pathMatch: 'full' },
  { path: 'frotapropria-s/:option/:value/:page', redirectTo: '/frotapropria-s/:option/:value/:page/*', pathMatch: 'full' },
  { path: 'frotapropria-s/:option/:value/:page/:id', component: LouvorComponent, data: fakeActivatedRoutesData.LouvoresSearchRoute.data },
];

describe('LouvorComponent', () => {
  let component: LouvorComponent;
  let fixture: ComponentFixture<LouvorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LouvorComponent,
        LouvorFormDetailComponent,
        LouvorFormComponent
      ],
      providers: [
        Renderer2,
        { provide: LouvorService, useClass: LouvorServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: DialogService, useClass: DialogServiceMock },
        MatSnackBar,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        UtilityService,
        { // ActivatedRoute
          provide: ActivatedRoute,
          useValue: {
            params: of(fakeActivatedRoutesData.LouvoresRoute.data),
            snapshot: {
              params: { ...fakeActivatedRoutesData.LouvoresRoute.data, page: 2 } // força snapshot com page 2 para ter isChanged
            },
            url: of(fakeActivatedRoutesData.LouvoresRoute.url),
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
    fixture = TestBed.createComponent(LouvorComponent);
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
    (component as any)._louvores = [louvor];
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
    component.detail(louvor);
    expect(component).toBeTruthy();
  });

  it('should be detail contrai', () => {
    (component as any)._expanded = louvor.id;
    component.detail(louvor);
    expect(component).toBeTruthy();
  });

  it('should be onChangePage', () => {
    component.onChangePage(2);
    expect(component).toBeTruthy();
  });

  it('should be novaLouvor dialog null', inject(
    [MatDialog],
    (dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = null;
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      component.newLouvor();
      expect(component).toBeTruthy();

    }
  ));

  it('should be novaLouvor dialog louvor id existente', inject(
    [MatDialog],
    (dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = { ...louvor };
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      component.newLouvor();
      expect(component).toBeTruthy();

    }
  ));

  it('should be novaLouvor dialog louvor id null', inject(
    [MatDialog],
    (dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = { ...louvor, id: null };
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      component.newLouvor();
      expect(component).toBeTruthy();

    }
  ));

  it('should be novaLouvor success false', inject(
    [LouvorService, MatDialog],
    (service: LouvorService, dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = { ...louvor, id: null };
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      // faz o setup
      const respAdicionaLouvor = [{ success: false }];
      (service as any).testSetup('respAdicionaLouvor', respAdicionaLouvor);

      component.newLouvor();
      expect(component).toBeTruthy();

    }
  ));

  it('should be novaLouvor throw error', inject(
    [LouvorService, MatDialog],
    (service: LouvorService, dialog: MatDialog) => {

      // faz o setup
      const respAfterClosed = { ...louvor, id: null };
      (dialog as any).testSetup('respAfterClosed', respAfterClosed);

      // faz o setup
      const erro = 'falha na requisição';
      const respAdicionaLouvor = [{ throw: true, error: erro }];
      (service as any).testSetup('respAdicionaLouvor', respAdicionaLouvor);

      component.newLouvor();
      expect(component).toBeTruthy();

    }
  ));

  it('should be delete dialog false', inject(
    [DialogService],
    (dialog: DialogService) => {

      // faz o setup
      const respOpen = [false];
      (dialog as any).testSetup('respOpen', respOpen);

      component.delete(louvor);
      expect(component).toBeTruthy();

    }
  ));

  it('should be delete dialog true', inject(
    [DialogService],
    (dialog: DialogService) => {

      // faz o setup
      const respOpen = [true];
      (dialog as any).testSetup('respOpen', respOpen);

      component.delete(louvor);
      expect(component).toBeTruthy();

    }
  ));

  it('should be delete success false', inject(
    [LouvorService],
    (service: LouvorService) => {

      // faz o setup
      const respDeletaLouvor = [{ success: false }];
      (service as any).testSetup('respDeletaLouvor', respDeletaLouvor);

      component.delete(louvor);
      expect(component).toBeTruthy();

    }
  ));

  it('should be delete throw error', inject(
    [LouvorService],
    (service: LouvorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respDeletaLouvor = [{ throw: true, error: erro }];
      (service as any).testSetup('respDeletaLouvor', respDeletaLouvor);

      component.delete(louvor);
      expect(component).toBeTruthy();

    }
  ));
});

// search
describe('LouvorComponent Search', () => {
  let component: LouvorComponent;
  let fixture: ComponentFixture<LouvorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LouvorComponent,
        LouvorFormDetailComponent,
        LouvorFormComponent
      ],
      providers: [
        Renderer2,
        { provide: LouvorService, useClass: LouvorServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: DialogService, useClass: DialogServiceMock },
        MatSnackBar,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        UtilityService,
        { // ActivatedRoute
          provide: ActivatedRoute,
          useValue: {
            params: of(fakeActivatedRoutesData.LouvoresSearchRoute.data),
            snapshot: {
              params: fakeActivatedRoutesData.LouvoresSearchRoute.data
            },
            url: of(fakeActivatedRoutesData.LouvoresSearchRoute.url),
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
    fixture = TestBed.createComponent(LouvorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be detail search', () => {
    component.detail(louvor);
    expect(component).toBeTruthy();
  });

  it('should be onChangePage search', () => {
    component.onChangePage(2);
    expect(component).toBeTruthy();
  });
});
