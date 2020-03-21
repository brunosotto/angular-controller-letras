import { Directive, ElementRef, Renderer2 } from '@angular/core';
import * as VMasker from 'vanilla-masker';

@Directive({
  selector: '[appCpfCnpjMask]'
})
export class CpfCnpjMaskDirective {
  public nativeElement: HTMLInputElement;

  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2
  ) {
    this.nativeElement = this.element.nativeElement;

    this.render.listen(this.nativeElement, 'keyup', () => {
      const s = this.nativeElement.value.replace(/[_\W]+/g, '');
      const n = s.length;
      let m;

      const CPFdigitos = 12;

      if (n < CPFdigitos) {
        m = '999.999.999-99?9';
      } else {
        m = '99.999.999/9999-99';
      }

      VMasker(this.nativeElement).maskPattern(m);
    });
  }

}
