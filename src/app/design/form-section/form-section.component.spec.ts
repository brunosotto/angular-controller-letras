import { IconPlusComponent } from '../icon-plus/icon-plus.component';
import { IconChevronComponent } from './../../design/icon-chevron/icon-chevron.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSectionComponent } from './form-section.component';

describe('FormSectionComponent', () => {
  let component: FormSectionComponent;
  let fixture: ComponentFixture<FormSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormSectionComponent,
        IconChevronComponent,
        IconPlusComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.toggle();
    expect(component).toBeTruthy();
  });
});
