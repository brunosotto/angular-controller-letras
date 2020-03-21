import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) {
      return 'Nunca';
    }

    // se é data texto trata
    if (typeof value === 'string') {

      // se a data é curta chumba o meio dia
      if (value.length === 10) {
        value += ' 12:00:00';
      }

      // instancia de data
      value = new Date(value);

    }

    const minuto = 60;
    const minutoHora = 60;
    const hora = minutoHora * minuto;
    const horaDia = 24;
    const dia = horaDia * hora;
    const diaAno = 365.25;
    const ano = diaAno * dia; // foi compensado ano bissexto com ano tendo 365,25 dias
    const mesesAno = 12;
    const mes = ano / mesesAno; // foi dividido a quantidade de segundos do ano direto por 12 para não ter 2a12m

    const milesimos = 1000;
    const seconds: number = Math.floor(((new Date()).getTime() - value.getTime()) / milesimos);
    let interval: number;
    let compl: number;

    interval = Math.floor(seconds / ano);
    if (interval >= 1) {
      compl = Math.floor((seconds % ano) / mes) || null;

      const b = compl ? `${compl}m` : '';
      return `${interval}a${b}`;
    }

    interval = Math.floor(seconds / mes);
    if (interval >= 1) {
      compl = Math.floor((seconds % mes) / dia) || null;

      const b = compl ? `${compl}d` : '';
      return `${interval}m${b}`;
    }

    interval = Math.floor(seconds / dia);
    if (interval >= 1) {
      compl = Math.floor((seconds % dia) / hora) || null;

      const b = compl ? `${compl}h` : '';
      return `${interval}d${b}`;
    }

    interval = Math.floor(seconds / hora);
    if (interval >= 1) {
      compl = Math.floor((seconds % hora) / minuto) || null;

      const b = compl || '';
      return `${interval}h${b}`;
    }

    interval = Math.floor(seconds / minuto);
    if (interval >= 1) {
      return `${interval}min`;
    }

    return '0min';
  }

}
