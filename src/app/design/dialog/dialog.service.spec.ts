import { DesignModule } from './../design.module';
import { TestBed, inject } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { Dialog } from './dialog.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityService } from '../../utility.service';

describe('DialogService', () => {
  const massa1: Dialog = {
    titulo: 'teste 1',
    texto: 'teste texto 1',
    hint: 'teste hint 1',
    textarea: false,
    textareaLabel: 'label do textarea',
    textareaValue: 'value do textarea',
    textareaRequired: true,
    textareaRequiredErrorText: 'em caso de erro',
    disableClose: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        UtilityService
      ],
      imports: [
        DesignModule,
        BrowserAnimationsModule
      ]
    });
  });

  it('should be created', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));

  it('should be getConfig', inject([DialogService], (service: DialogService) => {
    const config = (service as any).getConfig(massa1);
    expect(config.disableClose).toBe(massa1.disableClose);
  }));

  it('should be createDialog', inject([DialogService], (service: DialogService) => {
    (service as any).createDialog(null, massa1);
    expect(service).toBeTruthy();
  }));

  it('should be open', inject([DialogService], (service: DialogService) => {
    service.open(massa1).subscribe(ret => {
      // ret
    });
    expect(service).toBeTruthy();
  }));
});
