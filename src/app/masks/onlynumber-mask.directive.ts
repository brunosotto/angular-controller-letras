import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOnlynumberMask]'
})
export class OnlynumberMaskDirective {
  public nativeElement: HTMLInputElement;

  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2
  ) {
    this.nativeElement = this.element.nativeElement;

    this.render.listen(this.nativeElement, 'keyup', () => {
      const s = this.nativeElement.value.replace(/[^0-9]/g, '');
      this.nativeElement.value = s;
    });
  }

}
