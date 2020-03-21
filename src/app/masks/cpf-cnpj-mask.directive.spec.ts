import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CpfCnpjMaskDirective } from './cpf-cnpj-mask.directive';

@Component({
  template: '<input type="text" appCpfCnpjMask>'
})
class TestCpfCnpjMaskComponent {
}

describe('Directive: CpfCnpjMaskDirective', () => {
  let component: TestCpfCnpjMaskComponent;
  let fixture: ComponentFixture<TestCpfCnpjMaskComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCpfCnpjMaskComponent, CpfCnpjMaskDirective]
    });
    fixture = TestBed.createComponent(TestCpfCnpjMaskComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input cpf', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = '32550858883';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 51 // 3
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('325.508.588-83');
  });

  it('hovering over input cnpj', () => {
    const nativeElement: HTMLInputElement = inputEl.nativeElement;

    nativeElement.value = '07051084000131';
    inputEl.triggerEventHandler('keyup', {
      keyCode: 49 // 1
    });
    fixture.detectChanges();
    expect(nativeElement.value).toBe('07.051.084/0001-31');
  });
});
