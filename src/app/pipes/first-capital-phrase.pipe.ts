import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCapitalPhrase'
})
export class FirstCapitalPhrasePipe implements PipeTransform {

  transform(value: any): any {
    return value && value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() || value;
  }

}
