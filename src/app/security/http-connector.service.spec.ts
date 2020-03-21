import { ConfigServiceMock } from './../../../mock/config.service.mock';
import { RouterMock } from './../../../mock/router.mock';
import { HubConnectorComponentMock } from './../../../mock/hub-connector.component.mock';
import { TestBed, inject } from '@angular/core/testing';
import { HttpConnectorService } from './http-connector.service';
import { Router } from '@angular/router';
import { HubConnectorComponent, ConfigService } from '@afe/base-geral';
import { EncryptDecryptObjectService } from './encrypt-decrypt-object.service';
import { EncryptDecryptObjectServiceMock } from '../../../mock/encrypt-decrypt-object.service.mock';

describe('HttpConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpConnectorService,
        { provide: HubConnectorComponent, useClass: HubConnectorComponentMock },
        { provide: ConfigService, useClass: ConfigServiceMock },
        { provide: EncryptDecryptObjectService, useClass: EncryptDecryptObjectServiceMock },
        { provide: Router, useClass: RouterMock }
      ]
    });
  });

  function ab2str(buf): string {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  function str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i = i + 1) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  it('should be created', inject([HttpConnectorService], (service: HttpConnectorService) => {
    expect(service).toBeTruthy();
  }));

  it('should be get', inject(
    [HttpConnectorService],
    (service: HttpConnectorService) => {
      const url = 'url';

      service.get(url).subscribe(
        success => {
          expect(success.HostName).toBe('');
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be get erro', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const msg = 'Falha na req';

      // setup do hub
      const respGet = [{ throw: true, error: msg }];
      (hub as any).testSetup('respGet', respGet);

      service.get(url).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error).toBe(msg);
        }
      );
    }
  ));

  it('should be get erro 401 function', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const ret = { statusCode: '-33' };

      // setup do hub
      const respGet = [
        {
          throw: true,
          error: {
            status: 401,
            json: () => ret
          }
        }
      ];
      (hub as any).testSetup('respGet', respGet);

      service.get(url).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error.statusCode).toBe('-33');
        }
      );
    }
  ));

  it('should be get erro 401 body string', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const ret = '{ "statusCode": "-35" }';

      // setup do hub
      const respGet = [
        {
          throw: true,
          error: {
            status: 401,
            _body: ret
          }
        }
      ];
      (hub as any).testSetup('respGet', respGet);

      service.get(url).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error.statusCode).toBe('-35');
        }
      );
    }
  ));

  it('should be get erro 401 body', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const ret = { statusCode: '-34' };

      // setup do hub
      const respGet = [
        {
          throw: true,
          error: {
            status: 401,
            _body: ret
          }
        }
      ];
      (hub as any).testSetup('respGet', respGet);

      service.get(url).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error.statusCode).toBe('-34');
        }
      );
    }
  ));

  it('should be get erro 401 body string bad json', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const ret = '{ "statusCode: "-35" }';

      // setup do hub
      const respGet = [
        {
          throw: true,
          error: {
            status: 401,
            _body: ret
          }
        }
      ];
      (hub as any).testSetup('respGet', respGet);

      service.get(url).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error).toBe('JSON SyntaxError');
        }
      );
    }
  ));

  it('should be get erro 401 body ArrayBuffer bad json', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const ret = '{ "statusCode": "-38" }';

      // setup do hub
      const respGet = [
        {
          throw: true,
          error: {
            status: 401,
            _body: str2ab(ret)
          }
        }
      ];
      (hub as any).testSetup('respGet', respGet);

      service.get(url).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error).toBe('JSON SyntaxError');
        }
      );
    }
  ));

  it('should be post', inject(
    [HttpConnectorService],
    (service: HttpConnectorService) => {
      const url = 'url';

      service.post(url, {}).subscribe(
        success => {
          expect(success.HostName).toBe('');
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be post erro', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const msg = 'Falha na req';

      // setup do hub
      const respPost = [{ throw: true, error: msg }];
      (hub as any).testSetup('respPost', respPost);

      service.post(url, {}).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error).toBe(msg);
        }
      );
    }
  ));

  it('should be put', inject(
    [HttpConnectorService],
    (service: HttpConnectorService) => {
      const url = 'url';

      service.put(url, {}).subscribe(
        success => {
          expect(success.HostName).toBe('');
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be put erro', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const msg = 'Falha na req';

      // setup do hub
      const respPut = [{ throw: true, error: msg }];
      (hub as any).testSetup('respPut', respPut);

      service.put(url, {}).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error).toBe(msg);
        }
      );
    }
  ));

  it('should be delete', inject(
    [HttpConnectorService],
    (service: HttpConnectorService) => {
      const url = 'url';

      service.delete(url).subscribe(
        success => {
          expect(success.HostName).toBe('');
        },
        error => {
          expect(error).toBeUndefined();
        }
      );
    }
  ));

  it('should be delete erro', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const msg = 'Falha na req';

      // setup do hub
      const respDelete = [{ throw: true, error: msg }];
      (hub as any).testSetup('respDelete', respDelete);

      service.delete(url).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error).toBe(msg);
        }
      );
    }
  ));

  it('should be delete erro diferente', inject(
    [HttpConnectorService, HubConnectorComponent],
    (service: HttpConnectorService, hub: HubConnectorComponent) => {
      const url = 'url';
      const ret = 'ERRO';

      // setup do hub
      const respDelete = [
        {
          throw: false, // não é erro de comunicação
          direct: true, // é direto para vir como está a msg
          msg: {
            status: 401,
            error: ret,
            ok: false
          }
        }
      ];
      (hub as any).testSetup('respDelete', respDelete);

      service.delete(url).subscribe(
        success => {
          expect(success).toBeUndefined();
        },
        error => {
          expect(error).toBe(ret);
        }
      );
    }
  ));
});
