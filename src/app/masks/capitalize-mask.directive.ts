import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { UtilityService } from '../utility.service';

@Directive({
  selector: '[appCapitalizeMask]'
})
export class CapitalizeMaskDirective {
  public nativeElement: HTMLInputElement;

  constructor(
    private readonly element: ElementRef,
    private readonly render: Renderer2,
    private readonly util: UtilityService
  ) {
    this.nativeElement = this.element.nativeElement;

    this.render.listen(this.nativeElement, 'keyup', () => {
      const s = this.util.capitaLize(this.nativeElement.value);

      this.nativeElement.value = s;
    });
  }

}
