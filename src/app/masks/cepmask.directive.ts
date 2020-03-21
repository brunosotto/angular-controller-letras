import { Directive, ElementRef, Renderer2 } from '@angular/core';
import * as VMasker from 'vanilla-masker';

@Directive({
  selector: '[appCEPMask]'
})
export class CEPMaskDirective {
  public nativeElement: HTMLInputElement;

  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2
  ) {
    this.nativeElement = this.element.nativeElement;

    this.render.listen(this.nativeElement, 'keyup', () => {
      VMasker(this.nativeElement).maskPattern('99999-999');
    });
  }

}
