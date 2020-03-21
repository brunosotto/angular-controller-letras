import { OnlynumberMaskDirective } from './onlynumber-mask.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input type="text" appOnlynumberMask>'
})
class TestOnlynumberMaskComponent {
}

describe('Directive: OnlynumberMaskDirective', () => {
  let component: TestOnlynumberMaskComponent;
  let fixture: ComponentFixture<TestOnlynumberMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOnlynumberMaskComponent, OnlynumberMaskDirective]
    });
    fixture = TestBed.createComponent(TestOnlynumberMaskComponent);
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
    expect(nativeElement.value).toBe('12345');
  });
});
