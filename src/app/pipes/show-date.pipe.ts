import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showDate'
})
export class ShowDatePipe implements PipeTransform {

  transform(d: Date | string, options?: ShowDatePipeOptions): string {
    // retorna o nunca
    if (!d) {
      return 'Nunca';
    }

    // se é data texto trata
    if (typeof d === 'string') {

      // se a data é curta chumba o meio dia
      if (d.length === 10) {
        d += ' 12:00:00';
      }

      // instancia de data
      d = new Date(d);

    }

    if (options && options.noTime) {
      // '30/02/2018'
      return this.diaMesAno(d);
    } else {
      // '30/02/2018 - 14h45'
      return `${this.diaMesAno(d)} - ${this.horaMinuto(d)}`;
    }
  }

  private diaMesAno(d: Date): string {
    return `${this.pad(d.getDate())}/${this.pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }

  private horaMinuto(d: Date): string {
    return `${this.pad(d.getHours())}h${this.pad(d.getMinutes())}`;
  }

  private pad(n: number): string {
    const v = `0${n.toString()}`;
    const maxPad = 2;
    return v.substr(v.length - maxPad);
  }

}

export class ShowDatePipeOptions {
  noTime: boolean;
}
