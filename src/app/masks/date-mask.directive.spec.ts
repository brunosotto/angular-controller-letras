import { DateMaskDirective } from './date-mask.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input type="text" appDateMask>'
})
class TestDateMaskComponent {
}

describe('Directive: DateMaskDirective', () => {
  let component: TestDateMaskComponent;
  let fixture: ComponentFixture<TestDateMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDateMaskComponent, DateMaskDirective]
    });
    fixture = TestBed.createComponent(TestDateMaskComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = '21011985';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 53 // 5
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('21/01/1985');
  });
});
