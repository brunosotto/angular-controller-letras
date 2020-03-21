import { LoginServiceMock } from './../../../../mock/login.service.mock';
import { HubConnectorComponentMock } from './../../../../mock/hub-connector.component.mock';
import { EncryptDecryptObjectServiceMock } from './../../../../mock/encrypt-decrypt-object.service.mock';
import { EncriptionServiceMock } from './../../../../mock/encription.service.mock';
import { ConfigServiceMock } from './../../../../mock/config.service.mock';
import { ErrorPageService } from './../../static-pages/error-page/error-page.service';
import { PerfilService } from './../../security/perfil.service';
import { MatDialogModule } from '@angular/material';
import { DialogService } from './../dialog/dialog.service';
import { LoginService } from './../../security/login.service';
import { IconParceirosComponent } from './../icon-parceiros/icon-parceiros.component';
import { IconFecharComponent } from './../icon-fechar/icon-fechar.component';
import { IconDashboardComponent } from './../icon-dashboard/icon-dashboard.component';
import { IconParametrosComponent } from './../icon-parametros/icon-parametros.component';
import { IconBacklogComponent } from './../icon-backlog/icon-backlog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsMenuComponent } from './../icons-menu/icons-menu.component';
import { MenubarComponent } from './menubar/menubar.component';
import { IconLockComponent } from './../icon-lock/icon-lock.component';
import { LogoSantanderComponent } from './../logo-santander/logo-santander.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { UserInfoService } from '../../security/user-info.service';
import { EncryptDecryptObjectService } from '../../security/encrypt-decrypt-object.service';
import { UserInfoServiceMock } from '../../../../mock/user-info.service.mock';
import { ConfigService, EncriptionService, HubConnectorComponent } from '@afe/base-geral';
import { IconVehicleCarComponent } from '../icon-vehicle-car/icon-vehicle-car.component';
import { IconTruckComponent } from '../icon-truck/icon-truck.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        IconParametrosComponent,
        IconDashboardComponent,
        IconFecharComponent,
        IconParceirosComponent,
        IconVehicleCarComponent,
        IconTruckComponent,
        LogoSantanderComponent,
        IconLockComponent,
        MenubarComponent,
        IconsMenuComponent,
        IconBacklogComponent
      ],
      providers: [
        { provide: UserInfoService, useClass: UserInfoServiceMock },
        { provide: HubConnectorComponent, useClass: HubConnectorComponentMock },
        { provide: ConfigService, useClass: ConfigServiceMock },
        { provide: EncriptionService, useClass: EncriptionServiceMock },
        { provide: LoginService, useClass: LoginServiceMock },
        { provide: EncryptDecryptObjectService, useClass: EncryptDecryptObjectServiceMock },
        DialogService,
        PerfilService,
        ErrorPageService
      ],
      imports: [
        RouterTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
