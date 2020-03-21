import { CapitalizeMaskDirective } from './capitalize-mask.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UtilityService } from '../utility.service';

@Component({
  template: '<input type="text" appCapitalizeMask>'
})
class TestCapitalizeMaskComponent {
}

describe('Directive: CapitalizeMaskDirective', () => {
  let component: TestCapitalizeMaskComponent;
  let fixture: ComponentFixture<TestCapitalizeMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCapitalizeMaskComponent,
        CapitalizeMaskDirective
      ],
      providers: [
        UtilityService
      ]
    });
    fixture = TestBed.createComponent(TestCapitalizeMaskComponent);
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
