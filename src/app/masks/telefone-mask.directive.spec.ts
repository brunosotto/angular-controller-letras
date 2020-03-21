import { TelefoneMaskDirective } from './telefone-mask.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input type="text" appTelefoneMask>'
})
class TestTelefoneMaskComponent {
}

describe('Directive: appTelefoneMask', () => {
  let component: TestTelefoneMaskComponent;
  let fixture: ComponentFixture<TestTelefoneMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestTelefoneMaskComponent, TelefoneMaskDirective]
    });
    fixture = TestBed.createComponent(TestTelefoneMaskComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = '1435411880';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 48 // 0
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('(14) 3541-1880');
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = '11948639694';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 52 // 4
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('(11) 94863-9694');
  });
});
