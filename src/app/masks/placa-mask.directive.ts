import { Directive, ElementRef, Renderer2 } from '@angular/core';
import * as VMasker from 'vanilla-masker';

@Directive({
  selector: '[appPlacaMask]'
})
export class PlacaMaskDirective {
  public nativeElement: HTMLInputElement;

  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2
  ) {
    this.nativeElement = this.element.nativeElement;

    this.render.listen(this.nativeElement, 'keyup', () => {
      const s = this.nativeElement.value;
      this.nativeElement.value = s.toUpperCase();

      VMasker(this.nativeElement).maskPattern('AAA-SSSS');
    });
  }

}
