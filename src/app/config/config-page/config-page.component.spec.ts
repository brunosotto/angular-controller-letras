import { SearchInputModule } from './../../design/search-input/search-input.module';
import { LoginServiceMock } from './../../../../mock/login.service.mock';
import { PerfilServiceMock } from './../../../../mock/perfil.service.mock';
import { EncryptDecryptObjectServiceMock } from './../../../../mock/encrypt-decrypt-object.service.mock';
import { ConfigServiceMock } from './../../../../mock/config.service.mock';
import { StatesOfBrazilPipe } from './../../pipes/states-of-brazil.pipe';
import { DemandActionsComponent } from './../../demand/demand-actions/demand-actions.component';
import { DemandDetailSectionComponent } from './../../demand/demand-detail-section/demand-detail-section.component';
import { DemandItemDescriptorComponent } from './../../demand/demand-item-descriptor/demand-item-descriptor.component';
import { BacklogComponent } from './../../backlog/backlog/backlog.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigPageComponent } from './config-page.component';
import { LoginService } from '../../security/login.service';
import { EncryptDecryptObjectService } from '../../security/encrypt-decrypt-object.service';
import { HttpConnectorServiceMock } from '../../../../mock/http-connector.service.mock';
import { HttpConnectorService } from '../../security/http-connector.service';
import { DesignModule } from '../../design/design.module';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { FirstCapitalPhrasePipe } from '../../pipes/first-capital-phrase.pipe';
import { LocatorService } from '../../cadastre/locator/locator.service';
import { DialogService } from '../../design/dialog/dialog.service';
import { MatSnackBar } from '@angular/material';
import { UtilityService } from '../../utility.service';
import { UserInfoService } from '../../security/user-info.service';
import { UserInfoServiceMock } from '../../../../mock/user-info.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { PerfilService } from '../../security/perfil.service';
import { BacklogServiceMock } from '../../../../mock/backlog.service.mock';
import { ShowDatePipe } from '../../pipes/show-date.pipe';
import { BacklogService } from '../../backlog/backlog/backlog.service';
import { ConfigService } from '@afe/base-geral';

describe('ConfigPageComponent', () => {
  let component: ConfigPageComponent;
  let fixture: ComponentFixture<ConfigPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfigPageComponent,
        BacklogComponent,
        DemandItemDescriptorComponent,
        RelativeTimePipe,
        ShowDatePipe,
        StatesOfBrazilPipe,
        FirstCapitalPhrasePipe,
        DemandDetailSectionComponent,
        DemandActionsComponent
      ],
      providers: [
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        { provide: ConfigService, useClass: ConfigServiceMock },
        { provide: EncryptDecryptObjectService, useClass: EncryptDecryptObjectServiceMock },
        { provide: LoginService, useClass: LoginServiceMock },
        { provide: BacklogService, useClass: BacklogServiceMock },
        LocatorService,
        DialogService,
        MatSnackBar,
        UtilityService,
        { provide: UserInfoService, useClass: UserInfoServiceMock },
        { provide: PerfilService, useClass: PerfilServiceMock }
      ],
      imports: [
        DesignModule,
        RouterTestingModule,
        SearchInputModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
