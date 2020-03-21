import { Directive, ElementRef, Renderer2 } from '@angular/core';
import * as VMasker from 'vanilla-masker';

@Directive({
  selector: '[appDateMask]'
})
export class DateMaskDirective {
  public nativeElement: HTMLInputElement;

  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2
  ) {
    this.nativeElement = this.element.nativeElement;

    this.render.listen(this.nativeElement, 'keyup', () => {
      const m = '99/99/9999';

      VMasker(this.nativeElement).maskPattern(m);
    });
  }

}
