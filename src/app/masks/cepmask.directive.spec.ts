import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CEPMaskDirective } from './cepmask.directive';

@Component({
  template: '<input type="text" appCEPMask>'
})
class TestCEPMaskComponent {
}

describe('Directive: CEPMaskDirective', () => {
  let component: TestCEPMaskComponent;
  let fixture: ComponentFixture<TestCEPMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCEPMaskComponent, CEPMaskDirective]
    });
    fixture = TestBed.createComponent(TestCEPMaskComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = '16370000';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 48 // 0
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('16370-000');
  });
});
