import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCityStateMask]'
})
export class CityStateMaskDirective {
  public nativeElement: HTMLInputElement;

  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2
  ) {
    this.nativeElement = this.element.nativeElement;

    this.render.listen(this.nativeElement, 'keyup', () => {
      const v = this.nativeElement.value.split('/');
      if (v.length > 1) {
        v[0] = v[0].trim();
        v[1] = v[1].toUpperCase().trim();

        this.nativeElement.value = v.join('/');
      }
    });
  }

}
