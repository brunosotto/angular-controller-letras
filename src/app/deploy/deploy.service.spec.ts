import { HttpConnectorServiceMock } from './../../../mock/http-connector.service.mock';
import { TestBed, inject } from '@angular/core/testing';
import { DeployService } from './deploy.service';
import { HttpConnectorService } from '../security/http-connector.service';
import { UtilityService } from '../utility.service';

describe('DeployService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeployService,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        UtilityService
      ]
    });
  });

  it('should be created', inject([DeployService], (service: DeployService) => {
    expect(service).toBeTruthy();
  }));

});
