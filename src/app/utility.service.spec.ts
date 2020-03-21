import { TestBed, inject } from '@angular/core/testing';
import { Select, UtilityService } from './utility.service';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

describe('UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityService]
    });
  });

  it('should be created', inject([UtilityService], (service: UtilityService) => {
    expect(service).toBeTruthy();
  }));

  it('should be removeDiacritics', inject([UtilityService], (service: UtilityService) => {
    const strBefore = 'Opção';
    const strAfter = 'Opcao';

    expect(service.removeDiacritics(strBefore)).toBe(strAfter);
  }));

  it('should be camelize', inject([UtilityService], (service: UtilityService) => {
    const strBefore = 'Bruno Sotto';
    const strAfter = 'brunoSotto';

    expect(service.camelize(strBefore)).toBe(strAfter);
  }));

  it('should be trimPreventNull trim', inject([UtilityService], (service: UtilityService) => {
    const strBefore = ' bruno ';
    const strAfter = 'bruno';

    expect(service.trimPreventNull(strBefore)).toBe(strAfter);
  }));

  it('should be trimPreventNull null', inject([UtilityService], (service: UtilityService) => {
    const strBefore = null;
    const strAfter = null;

    expect(service.trimPreventNull(strBefore)).toBe(strAfter);
  }));

  it('should be trimPreventNull vazio', inject([UtilityService], (service: UtilityService) => {
    const strBefore = '';
    const strAfter = null;

    expect(service.trimPreventNull(strBefore)).toBe(strAfter);
  }));

  it('should be geraCodigo', inject([UtilityService], (service: UtilityService) => {
    const strBefore = 'Maçaneta Porta';
    const strAfter = 'macanetaPorta';

    expect(service.geraCodigo(strBefore)).toBe(strAfter);
  }));

  it('should be handlerGeraCodigo', inject([UtilityService], (service: UtilityService) => {
    const strBefore = 'Maçaneta Porta';
    const strAfter = 'macanetaPorta';
    const fn = service.handlerGeraCodigo();

    expect(fn(strBefore)).toBe(strAfter);
  }));

  it('should be comparacaoAttr string', inject([UtilityService], (service: UtilityService) => {
    const param = 'name';
    const fn = service.comparacaoAttr(param);

    const arr = [
      { name: 'Bruno' },
      { name: 'Gisleine' },
      { name: 'Alberto' }
    ];

    expect(arr.slice(0).sort(fn)[0].name).toBe(arr[2].name);
    expect(arr.slice(0).sort(fn)[1].name).toBe(arr[0].name);
    expect(arr.slice(0).sort(fn)[2].name).toBe(arr[1].name);
  }));

  it('should be comparacaoAttr string revert', inject([UtilityService], (service: UtilityService) => {
    const param = 'name';
    const fn = service.comparacaoAttr(param, true);

    const arr = [
      { name: 'Bruno' },
      { name: 'Gisleine' },
      { name: 'Alberto' }
    ];

    expect(arr.slice(0).sort(fn)[0].name).toBe(arr[1].name);
    expect(arr.slice(0).sort(fn)[1].name).toBe(arr[0].name);
    expect(arr.slice(0).sort(fn)[2].name).toBe(arr[2].name);
  }));

  it('should be comparacaoAttr number', inject([UtilityService], (service: UtilityService) => {
    const param = 'age';
    const fn = service.comparacaoAttr(param);

    const arr = [
      { age: 34 },
      { age: 52 },
      { age: 35 }
    ];

    expect(arr.slice(0).sort(fn)[0].age).toBe(arr[0].age);
    expect(arr.slice(0).sort(fn)[1].age).toBe(arr[2].age);
    expect(arr.slice(0).sort(fn)[2].age).toBe(arr[1].age);
  }));

  it('should be comparacaoAttr number revert', inject([UtilityService], (service: UtilityService) => {
    const param = 'age';
    const fn = service.comparacaoAttr(param, true);

    const arr = [
      { age: 34 },
      { age: 52 },
      { age: 35 }
    ];

    expect(arr.slice(0).sort(fn)[0].age).toBe(arr[1].age);
    expect(arr.slice(0).sort(fn)[1].age).toBe(arr[2].age);
    expect(arr.slice(0).sort(fn)[2].age).toBe(arr[0].age);
  }));

  it('should be comparacaoAttr date', inject([UtilityService], (service: UtilityService) => {
    const param = 'birthDate';
    const fn = service.comparacaoAttr(param);

    const arr = [
      { birthDate: new Date(1985, 0, 21) },
      { birthDate: new Date(1966, 7, 15) },
      { birthDate: new Date(1984, 0, 19) }
    ];

    expect(arr.slice(0).sort(fn)[0].birthDate.getTime()).toBe(arr[1].birthDate.getTime());
    expect(arr.slice(0).sort(fn)[1].birthDate.getTime()).toBe(arr[2].birthDate.getTime());
    expect(arr.slice(0).sort(fn)[2].birthDate.getTime()).toBe(arr[0].birthDate.getTime());
  }));

  it('should be comparacaoAttr date revert', inject([UtilityService], (service: UtilityService) => {
    const param = 'birthDate';
    const fn = service.comparacaoAttr(param, true);

    const arr = [
      { birthDate: new Date(1985, 0, 21) },
      { birthDate: new Date(1966, 7, 15) },
      { birthDate: new Date(1984, 0, 19) }
    ];

    expect(arr.slice(0).sort(fn)[0].birthDate.getTime()).toBe(arr[0].birthDate.getTime());
    expect(arr.slice(0).sort(fn)[1].birthDate.getTime()).toBe(arr[2].birthDate.getTime());
    expect(arr.slice(0).sort(fn)[2].birthDate.getTime()).toBe(arr[1].birthDate.getTime());
  }));

  it('should be validaNumerico disabled', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumerico(min, max, true);

    const control = {
      disabled: true
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaNumerico value null', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumerico(min, max, true);

    const control = {
      value: null
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaNumerico value \'\'', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumerico(min, max, true);

    const control = {
      value: ''
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaNumerico notnumber ,', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumerico(min, max, true);

    const control = {
      value: '3,3'
    };

    expect(fn(control as AbstractControl).notnumber).toBeTruthy();
  }));

  it('should be validaNumerico notnumber . not float', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumerico(min, max, false);

    const control = {
      value: '3.3'
    };

    expect(fn(control as AbstractControl).notnumber).toBeTruthy();
  }));

  it('should be validaNumerico val < min', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumerico(min, max, false);

    const control = {
      value: '3'
    };

    expect(fn(control as AbstractControl).minvalue).toBeTruthy();
  }));

  it('should be validaNumerico val > max', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumerico(min, max, false);

    const control = {
      value: '30'
    };

    expect(fn(control as AbstractControl).maxvalue).toBeTruthy();
  }));

  it('should be validaNumerico val ok', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumerico(min, max, false);

    const control = {
      value: '15'
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaNumericoAsync val ok', inject([UtilityService], (service: UtilityService) => {
    const min = 10;
    const max = 20;
    const fn = service.validaNumericoAsync(min, max, false);

    const control = {
      value: '15'
    };

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be regexCaracterEspecial', inject([UtilityService], (service: UtilityService) => {
    const regex = service.regexCaracterEspecial;
    const a = '@#bb';
    const b = 'Bruno Sotto';

    expect(regex.test(a)).toBeTruthy();
    expect(regex.test(b)).toBeFalsy();
  }));

  it('should be validaRegex', inject([UtilityService], (service: UtilityService) => {
    const regex = service.regexCaracterEspecial;
    const fn = service.validaRegex(regex);
    const a = '@#bb';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).regex).toBeTruthy();
  }));

  it('should be validaRegex disabled', inject([UtilityService], (service: UtilityService) => {
    const regex = service.regexCaracterEspecial;
    const fn = service.validaRegex(regex);
    const control = {
      disabled: true
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaRegex null', inject([UtilityService], (service: UtilityService) => {
    const regex = service.regexCaracterEspecial;
    const fn = service.validaRegex(regex);
    const control = {
      value: null
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaRegex ok', inject([UtilityService], (service: UtilityService) => {
    const regex = service.regexCaracterEspecial;
    const fn = service.validaRegex(regex);
    const a = 'Bruno Sotto';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaRegexAsync val ok', inject([UtilityService], (service: UtilityService) => {
    const regex = service.regexCaracterEspecial;
    const a = 'Bruno Sotto';
    const control = {
      value: a
    };
    const fn = service.validaRegexAsync(regex);

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be validaEspaco', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaEspaco();
    const a = ' ';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).required).toBeTruthy();
  }));

  it('should be validaEspaco null', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaEspaco();
    const a = null;
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).required).toBeTruthy();
  }));

  it('should be validaEspaco disabled', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaEspaco();
    const control = {
      disabled: true
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaEspaco ok', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaEspaco();
    const a = 'Bruno Sotto';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaEspacoAsync val ok', inject([UtilityService], (service: UtilityService) => {
    const a = 'Bruno Sotto';
    const control = {
      value: a
    };
    const fn = service.validaEspacoAsync();

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be validaUnique', inject([UtilityService], (service: UtilityService) => {
    const arr = ['a', 'b', 'c'];
    const fn = service.validaUnique(arr);
    const a = null;
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaUnique notUnique', inject([UtilityService], (service: UtilityService) => {
    const arr = ['a', 'b', 'c'];
    const handler = (v: string): string => v;
    const fn = service.validaUnique(arr, handler);
    const a = 'a';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).notUnique).toBeTruthy();
  }));

  it('should be validaUniqueAsync ok', inject([UtilityService], (service: UtilityService) => {
    const arr = ['a', 'b', 'c'];
    const a = 'Bruno Sotto';
    const control = {
      value: a
    };
    const fn = service.validaUniqueAsync(arr);

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be testCnpj 31 ok', inject([UtilityService], (service: UtilityService) => {
    const cnpj = '07.051.084/0001-31';
    const fn = service.testCnpj;

    expect(fn(cnpj)).toBeTruthy();
  }));

  it('should be testCnpj 38 erro', inject([UtilityService], (service: UtilityService) => {
    const cnpj = '07.051.084/0001-38';
    const fn = service.testCnpj;

    expect(fn(cnpj)).toBeFalsy();
  }));

  it('should be testCnpj 000 erro', inject([UtilityService], (service: UtilityService) => {
    const cnpj = '00.000.000/0000-00';
    const fn = service.testCnpj;

    expect(fn(cnpj)).toBeFalsy();
  }));

  it('should be testCnpj 40 erro', inject([UtilityService], (service: UtilityService) => {
    const cnpj = '07.051.084/0001-40';
    const fn = service.testCnpj;

    expect(fn(cnpj)).toBeFalsy();
  }));

  it('should be testCpf ok', inject([UtilityService], (service: UtilityService) => {
    const cpf = '325.508.588-83';
    const fn = service.testCpf;

    expect(fn(cpf)).toBeTruthy();
  }));

  it('should be testCpf errado', inject([UtilityService], (service: UtilityService) => {
    const cpf = '325.508.588-84';
    const fn = service.testCpf;

    expect(fn(cpf)).toBeFalsy();
  }));

  it('should be testCpf zero', inject([UtilityService], (service: UtilityService) => {
    const cpf = '000.000.000-00';
    const fn = service.testCpf;

    expect(fn(cpf)).toBeTruthy();
  }));

  it('should be testCpf 15', inject([UtilityService], (service: UtilityService) => {
    const cpf = '000.000.000-15';
    const fn = service.testCpf;

    expect(fn(cpf)).toBeFalsy();
  }));

  it('should be preMaskCpfCnpj CPF', inject([UtilityService], (service: UtilityService) => {
    const cpf = '32550858883';
    const cpfMask = '325.508.588-83';
    const fn = service.preMaskCpfCnpj;

    expect(fn(cpf)).toBe(cpfMask);
  }));

  it('should be preMaskCpfCnpj CNPJ', inject([UtilityService], (service: UtilityService) => {
    const cnpj = '07051084000131';
    const cnpjMask = '07.051.084/0001-31';
    const fn = service.preMaskCpfCnpj;

    expect(fn(cnpj)).toBe(cnpjMask);
  }));

  it('should be preMaskCpfCnpj null', inject([UtilityService], (service: UtilityService) => {
    const cnpj = null;
    const fn = service.preMaskCpfCnpj;

    expect(fn(cnpj)).toBeNull();
  }));

  it('should be validaCpfCnpj invalidCpfCnpj', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaCpfCnpj();
    const a = '325.508.588-84';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidCpfCnpj).toBeTruthy();
  }));

  it('should be validaCpfCnpj invalidCpfCnpj len', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaCpfCnpj();
    const a = '325.508.588-845';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidCpfCnpj).toBeTruthy();
  }));

  it('should be validaCpfCnpj invalidCpfCnpj CNPJ válido', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaCpfCnpj();
    const a = '07.051.084/0001-31';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaCpfCnpj valido', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaCpfCnpj();
    const a = '325.508.588-83';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaCpfCnpjAsync ok', inject([UtilityService], (service: UtilityService) => {
    const a = '325.508.588-83';
    const control = {
      value: a
    };
    const fn = service.validaCpfCnpjAsync();

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be preMaskTelefone', inject([UtilityService], (service: UtilityService) => {
    const telefone = '11948639694';
    const telefoneMask = '(11) 94863-9694';
    const fn = service.preMaskTelefone;

    expect(fn(telefone)).toBe(telefoneMask);
  }));

  it('should be preMaskTelefone', inject([UtilityService], (service: UtilityService) => {
    const telefone = '1435411880';
    const telefoneMask = '(14) 3541-1880';
    const fn = service.preMaskTelefone;

    expect(fn(telefone)).toBe(telefoneMask);
  }));

  it('should be preMaskTelefone null', inject([UtilityService], (service: UtilityService) => {
    const telefone = null;
    const fn = service.preMaskTelefone;

    expect(fn(telefone)).toBeNull();
  }));

  it('should be validaTelefone valido', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaTelefone();
    const a = '(11) 94863-9694';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaTelefone invalido', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaTelefone();
    const a = '(11)94863-96';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidFone).toBeTruthy();
  }));

  it('should be validaTelefoneAsync invalido', inject([UtilityService], (service: UtilityService) => {
    const a = '(11)94863-96';
    const control = {
      value: a
    };
    const fn = service.validaTelefoneAsync();

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res.invalidFone).toBeTruthy();
      }
    );
  }));

  it('should be maskToSendDate', inject([UtilityService], (service: UtilityService) => {
    const date = '21/01/1985';
    const dateMask = '1985-01-21';

    expect(service.maskToSendDate(date)).toBe(dateMask);
  }));

  it('should be preMaskDate null', inject([UtilityService], (service: UtilityService) => {
    const date = null;
    const fn = service.preMaskDate;

    expect(fn(date)).toBeNull();
  }));

  it('should be validaDate', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaDate();
    const a = '21/01/1985';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaDate null', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaDate();
    const a = null;
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaDate invalido', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaDate();
    const a = '21/01/198';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidDate).toBeTruthy();
  }));

  it('should be validaDate invalido 999', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaDate();
    const a = '99/99/9999';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidDate).toBeTruthy();
  }));

  it('should be validaDateAsync ok', inject([UtilityService], (service: UtilityService) => {
    const a = '21/01/1985';
    const control = {
      value: a
    };
    const fn = service.validaDateAsync();

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be preMaskPlaca null', inject([UtilityService], (service: UtilityService) => {
    const placa = null;
    const fn = service.preMaskPlaca;

    expect(fn(placa)).toBeNull();
  }));

  it('should be validaPlaca ok', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaPlaca();
    const a = 'BTZ-1860';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaPlaca invalido', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaPlaca();
    const a = 'BT8-1860';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidPlaca).toBeTruthy();
  }));

  it('should be validaPlaca invalido', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaPlaca();
    const a = 'BT8';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidPlaca).toBeTruthy();
  }));

  it('should be validaPlaca null', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaPlaca();
    const a = null;
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaPlacaAsync ok', inject([UtilityService], (service: UtilityService) => {
    const a = 'AOT-7148';
    const control = {
      value: a
    };
    const fn = service.validaPlacaAsync();

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be testRenavam ok', inject([UtilityService], (service: UtilityService) => {
    const cpf = '123456789';

    expect(service.testRenavam(cpf)).toBeTruthy();
  }));

  it('should be testRenavam false', inject([UtilityService], (service: UtilityService) => {
    const cpf = '00123456788';

    expect(service.testRenavam(cpf)).toBeFalsy();
  }));

  it('should be testRenavam digitos a mais', inject([UtilityService], (service: UtilityService) => {
    const cpf = '2200123456788';

    expect(service.testRenavam(cpf)).toBeFalsy();
  }));

  it('should be validaRenavam invalido', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaRenavam();
    const a = '123456788';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidRenavam).toBeTruthy();
  }));

  it('should be validaRenavam null', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaRenavam();
    const a = null;
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaRenavamAsync ok', inject([UtilityService], (service: UtilityService) => {
    const a = '123456789';
    const control = {
      value: a
    };
    const fn = service.validaRenavamAsync();

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be preMaskCEP null', inject([UtilityService], (service: UtilityService) => {
    const cep = null;

    expect(service.preMaskCEP(cep)).toBeNull();
  }));

  it('should be preMaskCEP null', inject([UtilityService], (service: UtilityService) => {
    const cep = '16370000';
    const cepMask = '16370-000';

    expect(service.preMaskCEP(cep)).toBe(cepMask);
  }));

  it('should be validaCEP null', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaCEP();
    const a = null;
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaCEP ok', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaCEP();
    const a = '16370-000';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaCEP erro', inject([UtilityService], (service: UtilityService) => {
    const fn = service.validaCEP();
    const a = '1234';
    const control = {
      value: a
    };

    expect(fn(control as AbstractControl).invalidCEP).toBeTruthy();
  }));

  it('should be validaCEPAsync ok', inject([UtilityService], (service: UtilityService) => {
    const a = '16370-000';
    const control = {
      value: a
    };
    const fn = service.validaCEPAsync();

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be multiValida ok', inject([UtilityService], (service: UtilityService) => {
    const a = '325.508.588-83';
    const control = {
      value: a
    };
    const fn = service.multiValida([
      service.validaEspaco(),
      service.validaCpfCnpjAsync()
    ]);

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be multiValida erro cpf', inject([UtilityService], (service: UtilityService) => {
    const a = '325.508.588-88';
    const control = {
      value: a
    };
    const fn = service.multiValida([
      service.validaEspaco(),
      service.validaCpfCnpjAsync()
    ]);

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res.invalidCpfCnpj).toBeTruthy();
      }
    );
  }));

  it('should be multiValida erro espaço', inject([UtilityService], (service: UtilityService) => {
    const a = '     ';
    const control = {
      value: a
    };
    const fn = service.multiValida([
      service.validaEspaco(),
      service.validaCpfCnpjAsync()
    ]);

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res.required).toBeTruthy();
      }
    );
  }));

  it('should be encapsulaSyncAsync ok', inject([UtilityService], (service: UtilityService) => {
    const a = '325.508.588-83';
    const control = {
      value: a
    };
    const fn = service.encapsulaSyncAsync(service.validaEspaco());

    (fn(control as AbstractControl) as Observable<any>).subscribe(
      res => {
        expect(res).toBeNull();
      }
    );
  }));

  it('should be validaCityState ok', inject([UtilityService], (service: UtilityService) => {
    const a = 'Promissão/SP';
    const control = {
      value: a
    };
    const fn = service.validaCityState();

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaCityState null', inject([UtilityService], (service: UtilityService) => {
    const a = null;
    const control = {
      value: a
    };
    const fn = service.validaCityState();

    expect(fn(control as AbstractControl)).toBeNull();
  }));

  it('should be validaCityState error', inject([UtilityService], (service: UtilityService) => {
    const a = 'Promissão/XX';
    const control = {
      value: a
    };
    const fn = service.validaCityState();

    expect(fn(control as AbstractControl).invalidCityState).toBeTruthy();
  }));

  it('should be validaCityState error 2', inject([UtilityService], (service: UtilityService) => {
    const a = 'Promissão/ABC';
    const control = {
      value: a
    };
    const fn = service.validaCityState();

    expect(fn(control as AbstractControl).invalidCityState).toBeTruthy();
  }));

  it('should be validaCityState error', inject([UtilityService], (service: UtilityService) => {
    const select = new Select('a', 'b');

    expect(select.value).toBe('a');
    expect(select.viewValue).toBe('b');
  }));

});
