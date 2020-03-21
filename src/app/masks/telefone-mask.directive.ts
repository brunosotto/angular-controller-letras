import { Directive, ElementRef, Renderer2 } from '@angular/core';
import * as VMasker from 'vanilla-masker';

@Directive({
  selector: '[appTelefoneMask]'
})
export class TelefoneMaskDirective {
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

      const TelefoneDigitos = 11;

      if (n < TelefoneDigitos) {
        m = '(99) 9999-9999?9';
      } else {
        m = '(99) 99999-9999';
      }

      VMasker(this.nativeElement).maskPattern(m);
    });
  }

}
