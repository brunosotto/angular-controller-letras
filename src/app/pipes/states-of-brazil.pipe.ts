import { Pipe, PipeTransform } from '@angular/core';
import { EstadosDoBrasil } from '../utility.service';

@Pipe({
  name: 'statesOfBrazil'
})
export class StatesOfBrazilPipe implements PipeTransform {

  transform(uf: string): string {
    // previne null
    if (!uf) {
      return uf;
    }

    // pega os estados
    const states = EstadosDoBrasil;

    // sempre upper case
    uf = uf.toUpperCase();

    // separa o estado
    const ret = states[uf];

    // retorna o estado ou o que chegou
    return ret || uf;
  }

}
