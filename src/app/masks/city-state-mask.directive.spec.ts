import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CityStateMaskDirective } from './city-state-mask.directive';

@Component({
  template: '<input type="text" appCityStateMask>'
})
class TestCityStateMaskComponent {
}

describe('Directive: CityStateMaskDirective', () => {
  let component: TestCityStateMaskComponent;
  let fixture: ComponentFixture<TestCityStateMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCityStateMaskComponent, CityStateMaskDirective]
    });
    fixture = TestBed.createComponent(TestCityStateMaskComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = 'Promissão';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 111 // o
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('Promissão');
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = 'Promissão/sp';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 112 // p
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('Promissão/SP');
  });
});
