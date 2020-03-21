import { EncryptDecryptObjectService } from './../../security/encrypt-decrypt-object.service';
import { ConfigService, HubConnectorComponent } from '@afe/base-geral';
import { HttpConnectorService } from './../../security/http-connector.service';
import { LoginService } from './../../security/login.service';
import { HubConnectorComponentMock } from './../../../../mock/hub-connector.component.mock';
import { EncryptDecryptObjectServiceMock } from './../../../../mock/encrypt-decrypt-object.service.mock';
import { ConfigServiceMock } from './../../../../mock/config.service.mock';
import { HttpConnectorServiceMock } from './../../../../mock/http-connector.service.mock';
import { LoginServiceMock } from './../../../../mock/login.service.mock';
import { UserInfoServiceMock } from './../../../../mock/user-info.service.mock';
import { UserInfoService } from './../../security/user-info.service';
import { ActivatedRouteMock } from './../../../../mock/activated-route.mock';
import { PerfilServiceMock } from './../../../../mock/perfil.service.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotfoundPageComponent } from './notfound-page.component';
import { ActivatedRoute } from '@angular/router';
import { DesignModule } from '../../design/design.module';
import { RouterTestingModule } from '@angular/router/testing';
import { PerfilService } from '../../security/perfil.service';

describe('NotfoundPageComponent', () => {
  let component: NotfoundPageComponent;
  let fixture: ComponentFixture<NotfoundPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotfoundPageComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: UserInfoService, useClass: UserInfoServiceMock },
        { provide: PerfilService, useClass: PerfilServiceMock },
        { provide: LoginService, useClass: LoginServiceMock },
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        { provide: ConfigService, useClass: ConfigServiceMock },
        { provide: EncryptDecryptObjectService, useClass: EncryptDecryptObjectServiceMock },
        { provide: HubConnectorComponent, useClass: HubConnectorComponentMock }
      ],
      imports: [
        DesignModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
