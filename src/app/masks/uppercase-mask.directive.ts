import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUppercaseMask]'
})
export class UppercaseMaskDirective {
  public nativeElement: HTMLInputElement;

  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2
  ) {
    this.nativeElement = this.element.nativeElement;

    this.render.listen(this.nativeElement, 'keyup', () => {
      const s = this.nativeElement.value.toUpperCase();

      this.nativeElement.value = s;
    });
  }

}
