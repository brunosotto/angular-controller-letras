import { PlacaMaskDirective } from './placa-mask.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input type="text" appPlacaMask>'
})
class TestPlacaMaskComponent {
}

describe('Directive: PlacaMaskDirective', () => {
  let component: TestPlacaMaskComponent;
  let fixture: ComponentFixture<TestPlacaMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestPlacaMaskComponent, PlacaMaskDirective]
    });
    fixture = TestBed.createComponent(TestPlacaMaskComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = 'aot7148';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 56 // 8
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('AOT-7148');
  });

  it('hovering over input', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = 'btz3a58';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 56 // 8
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('BTZ-3A58');
  });
});
