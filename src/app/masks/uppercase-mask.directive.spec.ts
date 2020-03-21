import { UppercaseMaskDirective } from './uppercase-mask.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input type="text" appUppercaseMask>'
})
class TestUppercaseMaskComponent {
}

describe('Directive: UppercaseMaskDirective', () => {
  let component: TestUppercaseMaskComponent;
  let fixture: ComponentFixture<TestUppercaseMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestUppercaseMaskComponent,
        UppercaseMaskDirective
      ],
      providers: []
    });
    fixture = TestBed.createComponent(TestUppercaseMaskComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = 'bruno sotto';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 111 // o
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('Bruno Sotto');
  });
});
