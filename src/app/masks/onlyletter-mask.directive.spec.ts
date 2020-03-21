import { OnlyletterMaskDirective } from './onlyletter-mask.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input type="text" appOnlyletterMask>'
})
class TestOnlyletterMaskComponent {
}

describe('Directive: OnlyletterMaskDirective', () => {
  let component: TestOnlyletterMaskComponent;
  let fixture: ComponentFixture<TestOnlyletterMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOnlyletterMaskComponent, OnlyletterMaskDirective]
    });
    fixture = TestBed.createComponent(TestOnlyletterMaskComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = 'B1R2U3N4O5';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 53 // 5
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('BRUNO');
  });
});
