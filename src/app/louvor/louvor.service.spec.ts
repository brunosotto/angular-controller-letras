import { HttpConnectorServiceMock } from './../../../mock/http-connector.service.mock';
import { TestBed, inject } from '@angular/core/testing';
import { LouvorService } from './louvor.service';
import { HttpConnectorService } from '../security/http-connector.service';
import { UtilityService } from '../utility.service';
import { Louvor } from '../models/louvor.model';

describe('LouvorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LouvorService,
        { provide: HttpConnectorService, useClass: HttpConnectorServiceMock },
        UtilityService
      ]
    });
  });

  const louvor: Louvor = {
    id: '1234',
    name: 'Bruno',
  };

  it('should be created', inject([LouvorService], (service: LouvorService) => {
    expect(service).toBeTruthy();
  }));

  it('should be listLouvores', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [
        { total: 1, louvores: [louvor] }
      ];
      (http as any).testSetup('respPost', respPost);

      const option = 'auctioneer';
      const value = '12345';
      const page = 1;
      service.listLouvores(option, value, page).subscribe(
        res => {
          expect(res.louvores[0].name).toBe('Bruno');
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be listLouvor erro', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      const option = 'auctioneer';
      const value = '12345';
      const page = 1;
      service.listLouvores(option, value, page).subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be findLouvor', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [louvor];
      (http as any).testSetup('respPost', respPost);

      service.findLouvor('1234').subscribe(
        res => {
          expect(res.name).toBe('Bruno');
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be finfLouvor erro', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      service.findLouvor('1234').subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be deleteLouvor', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [{ success: 'true', deleted: '1234' }];
      (http as any).testSetup('respPost', respPost);

      service.deleteLouvor(louvor).subscribe(
        res => {
          expect(res.success).toBeTruthy();
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be deleteLouvor erro', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      service.deleteLouvor(louvor).subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be addLouvor', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [{ success: 'true', deleted: '1234' }];
      (http as any).testSetup('respPost', respPost);

      service.addLouvor(louvor).subscribe(
        res => {
          expect(res.success).toBeTruthy();
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be addLouvor erro', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      service.addLouvor(louvor).subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be updateLouvor', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const respPost = [{ success: 'true', id: '1234' }];
      (http as any).testSetup('respPost', respPost);

      service.updateLouvor(louvor).subscribe(
        res => {
          expect(res.success).toBeTruthy();
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be updateLouvor erro', inject(
    [LouvorService, HttpConnectorService],
    (service: LouvorService, http: HttpConnectorService) => {

      // faz o setup
      const erro = 'falha na requisição';
      const respPost = [{ throw: true, error: erro }];
      (http as any).testSetup('respPost', respPost);

      service.updateLouvor(louvor).subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        error => {
          expect(error).toBe(erro);
        }
      );

    }
  ));

  it('should be limit', inject(
    [LouvorService],
    (service: LouvorService) => {

      expect(service.limit).toBe(10);

    }
  ));

});
