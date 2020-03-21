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
import { DeploymentProgressComponent } from './deployment-progress.component';
import { CommonModule } from '@angular/common';

describe('DeploymentProgressComponent', () => {
  let component: DeploymentProgressComponent;
  let fixture: ComponentFixture<DeploymentProgressComponent>;

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
        DeploymentProgressComponent
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
    fixture = TestBed.createComponent(DeploymentProgressComponent);
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
});
