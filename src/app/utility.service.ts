import { Observer, Observable } from 'rxjs';
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() {
    // UtilityService
  }

  public removeDiacritics(str: string): string {
    /**
     * Retorna a string sem acentos e sinais
     */

    const defaultDiacriticsRemovalMap = [
      { base: 'A', letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE]/g },
      { base: 'A', letters: /[\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6]/g },
      { base: 'A', letters: /[\u1E00\u0104\u023A\u2C6F]/g },
      { base: 'AA', letters: /[\uA732]/g },
      { base: 'AE', letters: /[\u00C6\u01FC\u01E2]/g },
      { base: 'AO', letters: /[\uA734]/g },
      { base: 'AU', letters: /[\uA736]/g },
      { base: 'AV', letters: /[\uA738\uA73A]/g },
      { base: 'AY', letters: /[\uA73C]/g },
      { base: 'B', letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
      { base: 'C', letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
      { base: 'D', letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
      { base: 'DZ', letters: /[\u01F1\u01C4]/g },
      { base: 'Dz', letters: /[\u01F2\u01C5]/g },
      { base: 'E', letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116]/g },
      { base: 'E', letters: /[\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
      { base: 'F', letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
      { base: 'G', letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
      { base: 'H', letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
      { base: 'I', letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208]/g },
      { base: 'I', letters: /[\u020A\u1ECA\u012E\u1E2C\u0197]/g },
      { base: 'J', letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
      { base: 'K', letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
      { base: 'L', letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60]/g },
      { base: 'L', letters: /[\uA748\uA746\uA780]/g },
      { base: 'LJ', letters: /[\u01C7]/g },
      { base: 'Lj', letters: /[\u01C8]/g },
      { base: 'M', letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
      { base: 'N', letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
      { base: 'NJ', letters: /[\u01CA]/g },
      { base: 'Nj', letters: /[\u01CB]/g },
      { base: 'O', letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C]/g },
      { base: 'O', letters: /[\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA]/g },
      { base: 'O', letters: /[\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
      { base: 'OI', letters: /[\u01A2]/g },
      { base: 'OO', letters: /[\uA74E]/g },
      { base: 'OU', letters: /[\u0222]/g },
      { base: 'P', letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
      { base: 'Q', letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
      { base: 'R', letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A]/g },
      { base: 'R', letters: /[\uA7A6\uA782]/g },
      { base: 'S', letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E]/g },
      { base: 'S', letters: /[\uA7A8\uA784]/g },
      { base: 'T', letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
      { base: 'TZ', letters: /[\uA728]/g },
      { base: 'U', letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5]/g },
      { base: 'U', letters: /[\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72]/g },
      { base: 'U', letters: /[\u0172\u1E76\u1E74\u0244]/g },
      { base: 'V', letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
      { base: 'VY', letters: /[\uA760]/g },
      { base: 'W', letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
      { base: 'X', letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
      { base: 'Y', letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
      { base: 'Z', letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
      { base: 'a', letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1]/g },
      { base: 'a', letters: /[\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD]/g },
      { base: 'a', letters: /[\u1EB7\u1E01\u0105\u2C65\u0250]/g },
      { base: 'aa', letters: /[\uA733]/g },
      { base: 'ae', letters: /[\u00E6\u01FD\u01E3]/g },
      { base: 'ao', letters: /[\uA735]/g },
      { base: 'au', letters: /[\uA737]/g },
      { base: 'av', letters: /[\uA739\uA73B]/g },
      { base: 'ay', letters: /[\uA73D]/g },
      { base: 'b', letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
      { base: 'c', letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
      { base: 'd', letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
      { base: 'dz', letters: /[\u01F3\u01C6]/g },
      { base: 'e', letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115]/g },
      { base: 'e', letters: /[\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B]/g },
      { base: 'e', letters: /[\u01DD]/g },
      { base: 'f', letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
      { base: 'g', letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
      { base: 'h', letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
      { base: 'hv', letters: /[\u0195]/g },
      { base: 'i', letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B]/g },
      { base: 'i', letters: /[\u1ECB\u012F\u1E2D\u0268\u0131]/g },
      { base: 'j', letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
      { base: 'k', letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
      { base: 'l', letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B]/g },
      { base: 'l', letters: /[\u2C61\uA749\uA781\uA747]/g },
      { base: 'lj', letters: /[\u01C9]/g },
      { base: 'm', letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
      { base: 'n', letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149]/g },
      { base: 'n', letters: /[\uA791\uA7A5]/g },
      { base: 'nj', letters: /[\u01CC]/g },
      { base: 'o', letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D]/g },
      { base: 'o', letters: /[\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB]/g },
      { base: 'o', letters: /[\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
      { base: 'oi', letters: /[\u01A3]/g },
      { base: 'ou', letters: /[\u0223]/g },
      { base: 'oo', letters: /[\uA74F]/g },
      { base: 'p', letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
      { base: 'q', letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
      { base: 'r', letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B]/g },
      { base: 'r', letters: /[\uA7A7\uA783]/g },
      { base: 's', letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F]/g },
      { base: 's', letters: /[\uA7A9\uA785\u1E9B]/g },
      { base: 't', letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66]/g },
      { base: 't', letters: /[\uA787]/g },
      { base: 'tz', letters: /[\uA729]/g },
      { base: 'u', letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6]/g },
      { base: 'u', letters: /[\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73]/g },
      { base: 'u', letters: /[\u0173\u1E77\u1E75\u0289]/g },
      { base: 'v', letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
      { base: 'vy', letters: /[\uA761]/g },
      { base: 'w', letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
      { base: 'x', letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
      { base: 'y', letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g },
      { base: 'z', letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }
    ];

    defaultDiacriticsRemovalMap.forEach(v => {
      str = str.replace(v.letters, v.base);
    });

    return str;
  }

  public camelize(str: string): string {
    /**
     * Retorna a string em camelCase
     */
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }

  public capitaLize(s: string): string {
    return s.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }

  public trimPreventNull(val: string): string {
    return val && val.length && val.trim() || null;
  }

  public geraCodigo(codigo: string, util?: UtilityService): string {
    /**
     * Gera código camelCase sem acentos e sinais
     */
    const u = util || this;

    codigo = u.removeDiacritics(codigo);
    codigo = u.camelize(codigo);

    return codigo;
  }

  public handlerGeraCodigo(): (a: string) => string {
    /**
     * Manipulador utilizado nos validadores
     * Retorna a função geraCodigo com as dependencias encapsuladas
     */
    const util = this;
    const geraCodigo = this.geraCodigo;

    return (a: string): string => {
      return geraCodigo(a, util);
    };
  }

  public comparacaoAttr(param: string, revert?: boolean): (a: any, b: any) => number {
    // utilizado no sort de objetos, sendo passado o nome do atributo
    return (a, b) => {
      // o multiplo serve para reverter caso assuma -1 fazendo a troca de sinais
      const multiplo = revert ? -1 : 1;

      if (typeof a[param] === 'object' && a[param] instanceof Date) {

        return multiplo * (a[param].getTime() - b[param].getTime());

      } else if (typeof a[param] === 'number') {

        return multiplo * (a[param] - b[param]);

      } else {

        if (a[param] === null || a[param] === undefined) {
          return multiplo * (-1);
        } else if (b[param] === null || b[param] === undefined) {
          return multiplo * (+1);
        } else {
          return multiplo * (a[param].toString().localeCompare(b[param].toString()));
        }

      }
    };
  }

  public validaNumerico(min: number, max: number, float: boolean): ValidatorFn {
    /**
     * Validador de numéricos
     * deve ser informado o mínimo, máximo e se permitirá float
     *
     * Retorna
     * - notnumber: quando a entrada contém caractéres não numéricos
     * - notfloat:  quando não é permitido float e recebeu float
     * - minvalue:  quando o valor é menor que o mínimo passado
     * - maxvalue:  quando o valor é maior que o máximo passado
     * - null quando tudo bem
     */
    return (control: AbstractControl): ValidationErrors => {
      // retorna null nos controles desabilitados
      if (control.disabled) {

        return null;

      } else if (control.value === null || control.value === '') {

        return null;

      } else if (control.value.toString().match(/[^\d\.]/g)) { // not digito e ponto

        return { notnumber: true };

      } else if (!float && control.value.toString().match(/[^0-9]/g)) { // not digito caso n'ao float

        return { notnumber: true };

      } else {

        const val = parseFloat(control.value);

        if (val < min) {

          return { minvalue: true };

        } else if (val > max) {

          return { maxvalue: true };

        } else {

          return null;

        }
      }
    };
  }

  public validaNumericoAsync(min: number, max: number, float: boolean): AsyncValidatorFn {
    /**
     * Encapsulo o validaNumerico para ser um observable
     */
    const validaNumerico = this.validaNumerico(min, max, float);

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaNumerico(control));
        observer.complete();

      });
    };
  }

  public get regexCaracterEspecial(): RegExp {
    return /[~^!@#$%¨&*\(\)_+=´`\[\{\]\}\/;:,.><\\\|'"°ºª₢°§¬¢£³²¹]/g;
  }

  public validaRegex(regex: RegExp, attrName?: string): ValidatorFn {
    /**
     * Validador de regex
     * informando a regex retornará regex:true quando encontrar alguma ocorrência
     * Opcionalmente pode ser passado o nome do atributo de retorno que por padrão é regex
     * Retorna null sempre que não houver problemas
     */

    attrName = attrName || 'regex';

    return (control: AbstractControl): ValidationErrors => {
      // retorna null nos controles desabilitados
      if (control.disabled) {

        return null;

      } else if (control.value === null || control.value === '') {

        return null;

      } else if (control.value.match(regex)) {

        const ret = {};
        ret[attrName] = true;

        return ret;

      } else {

        return null;

      }
    };
  }

  public validaRegexAsync(regex: RegExp, attrName?: string): AsyncValidatorFn {
    /**
     * Encapsula o validaRegex para ser um observable
     */
    const validaRegex = this.validaRegex(regex, attrName);

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaRegex(control));
        observer.complete();

      });
    };
  }

  public validaEspaco(): ValidatorFn {
    /**
     * Validador de espaço em branco
     * Retorna required quando é apenas espaço em branco
     */

    return (control: AbstractControl): ValidationErrors => {
      // retorna null nos controles desabilitados
      if (control.disabled) {

        return null;

      } else if (control.value === null || control.value === '') {

        return { required: true };

      } else if (control.value && typeof control.value === 'string' && control.value.trim().length === 0) {

        return { required: true };

      } else {

        return null;

      }
    };
  }

  public validaEspacoAsync(): AsyncValidatorFn {
    /**
     * Encapsula o validaEspaco para ser um observable
     */
    const validaEspaco = this.validaEspaco();

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaEspaco(control));
        observer.complete();

      });
    };
  }

  public validateEnvName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const regex = /[^A-Za-z0-9_.]+/g;

      if (!control.value || regex.test(control.value)) {

        return { invalidEnvName: true };

      } else {

        return null;

      }
    };
  }

  public validateGitHubUrl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const regex = /(https:\/\/)([\/a-zA-Z0-9_\\.\-])+(.git)$/;

      if (control.value && !regex.test(control.value)) {

        return { invalidGithubUrl: true };

      } else {

        return null;

      }
    };
  }

  public validatePath(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const regex = /(\/)([\/a-zA-Z0-9_\\.\-])+(\/)$/;

      if (control.value && !regex.test(control.value)) {

        return { invalidPath: true };

      } else {

        return null;

      }
    };
  }

  public validaUnique(values: string[], handler?: (a: string) => string): ValidatorFn {
    /**
     * Valida se o valor passado é unico sendo inexistente no array de string (values)
     * opcionalmente pode ser informado uma manipulador que irá ajustar a string antes da verificação
     *
     * o retorno será null se for único ou { notUnique: true } caso já exista
     */
    handler = handler || ((a: string): string => a);

    return (control: AbstractControl): ValidationErrors => {
      const val = handler(control.value || '');

      if (values.indexOf(val) > -1) {

        return { notUnique: true };

      } else {

        return null;

      }
    };
  }

  public validaUniqueAsync(values: string[], handler?: (a: string) => string): AsyncValidatorFn {
    /**
     * Encapsula o validaUnique para ser um observable
     */
    const validaUnique = this.validaUnique(values, handler);

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaUnique(control));
        observer.complete();

      });
    };
  }

  public testCnpj(val: string): boolean {
    val = val.replace(/\D/g, '');

    const zero = 0;
    const um = 1;
    const dois = 2;
    const oito = 8;
    const nove = 9;
    const dez = 10;
    const onze = 11;
    const doze = 12;

    const cnpj = val.substr(zero, doze);
    const dv = val.substr(doze, dois);
    let sum;
    let rest;

    sum = zero;
    for (let i = zero; i < doze; i = i + 1) {
      sum += parseInt(cnpj.charAt(onze - i), dez) * (dois + (i % oito));
    }

    if (sum === zero) {
      return false;
    }

    rest = onze - (sum % onze);

    if (rest > nove) {
      rest = zero;
    }

    if (parseInt(dv.charAt(zero), dez) !== rest) {
      return false;
    }

    sum = rest * dois;
    for (let i = zero; i < doze; i = i + 1) {
      sum += parseInt(cnpj.charAt(onze - i), dez) * (dois + ((i + um) % oito));
    }

    rest = onze - (sum % onze);
    if (rest > nove) {
      rest = zero;
    }

    if (parseInt(dv.charAt(um), dez) !== rest) {
      return false;
    }

    return true;
  }

  public testCpf(val: string): boolean {
    val = val.replace(/\D/g, '');

    const zero = 0;
    const um = 1;
    const nove = 9;
    const dez = 10;
    const onze = 11;
    const doze = 12;

    let sum;
    let rest;

    sum = zero;
    for (let i = um; i <= nove; i = i + 1) {
      sum += parseInt(val.substring(i - um, i), dez) * (onze - i);
    }
    rest = (sum * dez) % onze;

    if ((rest === dez) || (rest === onze)) {
      rest = zero;
    }

    if (rest !== parseInt(val.substring(nove, dez), dez)) {
      return false;
    }

    sum = zero;
    for (let i = um; i <= dez; i = i + 1) {
      sum += parseInt(val.substring(i - um, i), dez) * (doze - i);
    }
    rest = (sum * dez) % onze;

    if ((rest === dez) || (rest === onze)) {
      rest = zero;
    }

    if (rest !== parseInt(val.substring(dez, onze), dez)) {
      return false;
    }

    return true;
  }

  public preMaskCpfCnpj(val: string): string {
    /**
     * Devido ao defeito da mascara ocorrer após a validação, tive que criar esta pré máscara para validar com ela
     * Contando que o valor será mascarado
     * Usado também antes da gravação
     */
    val = val && val.replace(/\D/g, '') || '';

    if (!val.length) {
      return null;
    }

    const zero = 0;
    const dois = 2;
    const tres = 3;
    const quatro = 4;
    const cinco = 5;
    const seis = 6;
    const oito = 8;
    const nove = 9;
    const doze = 12;
    const n14 = 14;

    if (val.length === n14) { // cnpj

      const a = val.substr(zero, dois);
      const b = val.substr(dois, tres);
      const c = val.substr(cinco, tres);
      const d = val.substr(oito, quatro);
      const e = val.substr(doze, dois);

      val = `${a}.${b}.${c}/${d}-${e}`;

    } else { // cpf

      const a = val.substr(zero, tres);
      const b = val.substr(tres, tres);
      const c = val.substr(seis, tres);
      const d = val.substr(nove, dois);

      val = `${a}.${b}.${c}-${d}`;

    }

    return val;
  }

  public validaCpfCnpj(): ValidatorFn {
    /**
     * Valida se o valor passado é um Cpf / Cnpj válido
     * Valida primeiro a máscara 999.999.999-99 ou 99.999.999/9999-99
     * Valida matematicamente o dv
     *
     * o retorno será null se for válido ou { invalidCpfCnpj: true } caso inválido
     */

    return (control: AbstractControl): ValidationErrors => {
      const val = this.preMaskCpfCnpj(control.value);

      // previde length of null
      if (val === null) {
        return null;
      }

      const len = val.length;
      const lenDig = control.value.replace(/\D/g, '').length; // faz do valor original
      const RegExpCpf = /\d{3}(?:\.)?\d{3}(?:\.)?\d{3}(?:-)?\d{2}/;
      const RegExpCnpj = /\d{2}(?:\.)?\d{3}(?:\.)?\d{3}(?:\/)?\d{4}(?:\-)?\d{2}/;

      const n11 = 11;
      const n14 = 14;
      const n18 = 18;

      if (
        (lenDig !== n11 && lenDig !== n14) ||
        (len !== n14 && len !== n18) ||
        (len === n14 && (!RegExpCpf.test(val) || !this.testCpf(val))) ||
        (len === n18 && (!RegExpCnpj.test(val) || !this.testCnpj(val)))
      ) {
        return { invalidCpfCnpj: true };
      }

      return null;
    };
  }

  public validaCpfCnpjAsync(): AsyncValidatorFn {
    /**
     * Encapsula o validaCpfCnpj para ser um observable
     */
    const validaCpfCnpj = this.validaCpfCnpj();

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaCpfCnpj(control));
        observer.complete();

      });
    };
  }

  public preMaskTelefone(val: string): string {
    /**
     * Devido ao defeito da mascara ocorrer após a validação, tive que criar esta pré máscara para validar com ela
     * Contando que o valor será mascarado
     * Usado também antes da gravação
     */
    val = val && val.replace(/\D/g, '') || '';

    const zero = 0;
    const dois = 2;
    const quatro = 4;
    const cinco = 5;
    const seis = 6;
    const sete = 7;
    const onze = 11;

    if (!val.length) {
      return null;
    }

    if (val.length === onze) {

      const a = val.substr(zero, dois);
      const b = val.substr(dois, cinco);
      const c = val.substr(sete, quatro);

      val = `(${a}) ${b}-${c}`;

    } else {

      const a = val.substr(zero, dois);
      const b = val.substr(dois, quatro);
      const c = val.substr(seis, quatro);

      val = `(${a}) ${b}-${c}`;

    }

    return val;
  }

  public validaTelefone(): ValidatorFn {
    /**
     * Valida se o valor passado é um Telefone válido
     * São considerados válidos: (99)9999-9999 ou (99)99999-9999 ou (99)9999-99999 ou (99)99999-99999
     *
     * o retorno será null se for válido ou { invalidFone: true } caso inválido
     */

    return (control: AbstractControl): ValidationErrors => {
      if (control.value === null || control.value === '') {
        return null;
      }

      const val = this.preMaskTelefone(control.value);
      const RegExp = /(?:\()?\d{2}(?:\))\s?\d{4,5}(?:-)?\d{4,5}/;

      if (!RegExp.test(val)) {
        return { invalidFone: true };
      }

      return null;
    };
  }

  public validaTelefoneAsync(): AsyncValidatorFn {
    /**
     * Encapsula o validaTelefone para ser um observable
     */
    const validaTelefone = this.validaTelefone();

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaTelefone(control));
        observer.complete();

      });
    };
  }

  public maskToSendDate(val: string): string {
    /**
     * transforma dd/mm/aaaa em aaaa-mm-dd
     */
    return this.preMaskDate(val).split('/').reverse().join('-');
  }

  public preMaskDate(val: string): string {
    /**
     * Devido ao defeito da mascara ocorrer após a validação, tive que criar esta pré máscara para validar com ela
     * Contando que o valor será mascarado
     * Usado também antes da gravação
     */
    val = val && val.replace(/\D/g, '') || '';

    if (!val.length) {
      return null;
    }

    const zero = 0;
    const dois = 2;
    const quatro = 4;

    const a = val.substr(zero, dois);
    const b = val.substr(dois, dois);
    const c = val.substr(quatro, quatro);

    return `${a}/${b}/${c}`;
  }

  public validaDate(): ValidatorFn {
    /**
     * Valida se o valor passado é uma data válida formato dd/mm/aaaa
     *
     * o retorno será null se for válido ou { invalidDate: true } caso inválido
     */

    return (control: AbstractControl): ValidationErrors => {
      if (control.value === null || control.value === '') {
        return null;
      }

      const val = this.preMaskDate(control.value);
      const RegExp = /\d{2}(?:\/)?\d{2}(?:\/)?\d{4}/;

      if (!RegExp.test(val)) {
        return { invalidDate: true };
      }

      const zero = 0;
      const um = 1;
      const dois = 2;
      const dez = 10;

      const bits = val.split('/').map(v => parseInt(v, dez));
      const d = new Date(bits[dois], bits[um] - um, bits[zero]);
      if (d.getFullYear() !== bits[dois] || (d.getMonth() + um) !== bits[um] || d.getDate() !== bits[zero]) {
        return { invalidDate: true };
      }

      return null;
    };
  }

  public validaDateAsync(): AsyncValidatorFn {
    /**
     * Encapsula o validaDate para ser um observable
     */
    const validaDate = this.validaDate();

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaDate(control));
        observer.complete();

      });
    };
  }

  public preMaskPlaca(val: string): string {
    /**
     * Devido ao defeito da mascara ocorrer após a validação, tive que criar esta pré máscara para validar com ela
     * Contando que o valor será mascarado
     * Usado também antes da gravação
     */
    val = val && val.toUpperCase().replace(/[^-A-Z0-9]/g, '') || '';

    const zero = 0;
    const um = 1;

    if (!val.length) {
      return null;
    }

    const pre = val.split('-')[zero].replace(/[^A-Z]/g, '');
    const suf = val.split('-')[um] && val.split('-')[1].replace(/[^A-Z0-9]/g, '') || '';

    return `${pre}-${suf}`;
  }

  public validaPlaca(): ValidatorFn {
    /**
     * Valida se o valor passado é uma placa válida formato AAA-1234 ou AAA-1A23 conforme futuro modelo
     *
     * o retorno será null se for válido ou { invalidPlaca: true } caso inválido
     */

    return (control: AbstractControl): ValidationErrors => {
      if (control.value === null || control.value === '') {
        return null;
      }

      const val = this.preMaskPlaca(control.value);
      const RegExp = /[A-Z]{3}(?:\-)?[A-Z0-9]{4}/;

      if (!RegExp.test(val)) {
        return { invalidPlaca: true };
      }

      return null;
    };
  }

  public validaPlacaAsync(): AsyncValidatorFn {
    /**
     * Encapsula o validaPlaca para ser um observable
     */
    const validaPlaca = this.validaPlaca();

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaPlaca(control));
        observer.complete();

      });
    };
  }

  public testRenavam(val: string): boolean {
    val = val.replace(/\D/g, '');

    const zero = 0;
    const um = 1;
    const dois = 2;
    const tres = 3;
    const oito = 8;
    const nove = 9;
    const dez = 10;
    const onze = 11;

    // Completa com zeros a esquerda se for no padrao antigo de 9 digitos
    if (val.length === nove) {
      val = `00${val}`;
    }

    // Valida se possui 11 digitos
    if (val.length !== onze) {
      return false;
    }

    // Remove o dv (11 posicao)
    const renavamSemDV = val.substring(zero, dez);

    // Inverte os caracteres (reverso)
    const renavamReversoSemDV = renavamSemDV.split('').reverse().join('');

    let soma = zero;

    // Multiplica as strings reversas do renavam pelos numeros multiplicadores 2, 3, 4, 5, 6, 7, 8, 9
    // para apenas os primeiros 8 digitos de um total de 10
    for (let i = zero; i < oito; i = i + 1) {
      const algarismo = parseInt(renavamReversoSemDV.charAt(i), dez);
      const multiplicador = i + dois;
      soma += algarismo * multiplicador;
    }

    // Multiplica os dois ultimos digitos e soma
    soma += parseInt(renavamReversoSemDV.charAt(oito), dez) * dois;
    soma += parseInt(renavamReversoSemDV.charAt(nove), dez) * tres;

    // Calcula DV
    let DVCalculado = onze - (soma % onze);
    DVCalculado = DVCalculado >= dez ? zero : DVCalculado;

    // Pego o DV do renavam original (para confrontar com o calculado)
    const dv = parseInt(val.substr(val.length - um, um), dez);

    // Comparo os digitos calculado e informado
    return DVCalculado === dv;
  }

  public validaRenavam(): ValidatorFn {
    /**
     * Valida se o valor passado é um renavam válido pelo dv
     *
     * o retorno será null se for válido ou { invalidRenavam: true } caso inválido
     */

    return (control: AbstractControl): ValidationErrors => {
      if (control.value === null || control.value === '') {
        return null;
      }

      const val = control.value.replace(/\D/g, '');
      if (!this.testRenavam(val)) {
        return { invalidRenavam: true };
      }

      return null;
    };
  }

  public validaRenavamAsync(): AsyncValidatorFn {
    /**
     * Encapsula o validaRenavam para ser um observable
     */
    const validaRenavam = this.validaRenavam();

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaRenavam(control));
        observer.complete();

      });
    };
  }

  public preMaskCEP(val: string): string {
    /**
     * Devido ao defeito da mascara ocorrer após a validação, tive que criar esta pré máscara para validar com ela
     * Contando que o valor será mascarado
     * Usado também antes da gravação
     */
    val = val && val.replace(/\D/g, '') || '';

    const zero = 0;
    const tres = 3;
    const cinco = 5;

    if (!val.length) {
      return null;
    }

    const a = val.substr(zero, cinco);
    const b = val.substr(cinco, tres);

    return `${a}-${b}`;
  }

  public validaCEP(): ValidatorFn {
    /**
     * Valida se o valor passado é um cep válido formato 16370-000
     *
     * o retorno será null se for válido ou { invalidCEP: true } caso inválido
     */

    return (control: AbstractControl): ValidationErrors => {
      if (control.value === null || control.value === '') {
        return null;
      }

      const val = this.preMaskCEP(control.value);
      const RegExp = /\d{5}(?:\-)?\d{3}/;

      if (!RegExp.test(val)) {
        return { invalidCEP: true };
      }

      return null;
    };
  }

  public validaCEPAsync(): AsyncValidatorFn {
    /**
     * Encapsula o validaCEP para ser um observable
     */
    const validaCEP = this.validaCEP();

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validaCEP(control));
        observer.complete();

      });
    };
  }

  public multiValida(validators: ValidatorFn[] | AsyncValidatorFn[]): AsyncValidatorFn {
    /**
     * Encapsula vários validadores e testa cada um em sequencia
     * O retorno é o retorno do primeiro validador que acusar problema ou nulo caso todos passem
     * Aceita validadores Observable e direto
     */

    // clona o array de validadores
    let vali: ValidatorFn[] | AsyncValidatorFn[];

    const valid = (control: AbstractControl, observer: Observer<ValidationErrors>) => {
      if (!vali.length) {
        observer.next(null);
        observer.complete();

        return;
      }

      const validator = vali.shift();
      const result = validator(control);

      // Observable
      if (result instanceof Observable) {

        result.subscribe(res => {

          if (res !== null) {

            observer.next(res);
            observer.complete();

          } else {

            valid(control, observer);

          }

        });

      } else if (result !== null) {

        observer.next(result);
        observer.complete();

      } else {

        valid(control, observer);

      }
    };

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        const zero = 0;

        vali = validators.slice(zero);

        valid(control, observer);

      });
    };
  }

  public encapsulaSyncAsync(validator: ValidatorFn): AsyncValidatorFn {
    /**
     * Encapsula qualquer validador para se transformar em assync
     */

    return (control: AbstractControl) => {
      return Observable.create(observer => {

        observer.next(validator(control));
        observer.complete();

      });
    };
  }

  public validaCityState(): ValidatorFn {
    /**
     * Valida se o valor é cidade/UF
     */

    return (control: AbstractControl): ValidationErrors => {
      const um = 1;
      const dois = 2;

      if (control.value === null || control.value === '') {
        return null;
      }

      const values = control.value.split('/');

      if (values.length !== dois || values[um].length !== dois) {
        return { invalidCityState: true };
      }

      const uf = values[um].toUpperCase();

      if (!EstadosDoBrasil[uf]) {
        return { invalidCityState: true };
      }

      return null;
    };
  }

}

export enum EstadosDoBrasil {
  AC = 'Acre',
  AL = 'Alagoas',
  AP = 'Amapá',
  AM = 'Amazonas',
  BA = 'Bahia',
  CE = 'Ceará',
  DF = 'Distrito Federal',
  ES = 'Espírito Santo',
  GO = 'Goiás',
  MA = 'Maranhão',
  MT = 'Mato Grosso',
  MS = 'Mato Grosso do Sul',
  MG = 'Minas Gerais',
  PA = 'Pará',
  PB = 'Paraíba',
  PR = 'Paraná',
  PE = 'Pernambuco',
  PI = 'Piauí',
  RJ = 'Rio de Janeiro',
  RN = 'Rio Grande do Norte',
  RS = 'Rio Grande do Sul',
  RO = 'Rondônia',
  RR = 'Roraima',
  SC = 'Santa Catarina',
  SP = 'São Paulo',
  SE = 'Sergipe',
  TO = 'Tocantins'
}
