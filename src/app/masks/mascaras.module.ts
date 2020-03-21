import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefoneMaskDirective } from './telefone-mask.directive';
import { CpfCnpjMaskDirective } from './cpf-cnpj-mask.directive';
import { DateMaskDirective } from './date-mask.directive';
import { PlacaMaskDirective } from './placa-mask.directive';
import { CEPMaskDirective } from './cepmask.directive';
import { CityStateMaskDirective } from './city-state-mask.directive';
import { OnlynumberMaskDirective } from './onlynumber-mask.directive';
import { OnlyletterMaskDirective } from './onlyletter-mask.directive';
import { CapitalizeMaskDirective } from './capitalize-mask.directive';
import { UppercaseMaskDirective } from './uppercase-mask.directive';
import { UtilityService } from '../utility.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TelefoneMaskDirective,
    CpfCnpjMaskDirective,
    DateMaskDirective,
    PlacaMaskDirective,
    CEPMaskDirective,
    CityStateMaskDirective,
    OnlynumberMaskDirective,
    OnlyletterMaskDirective,
    CapitalizeMaskDirective,
    UppercaseMaskDirective
  ],
  exports: [
    TelefoneMaskDirective,
    CpfCnpjMaskDirective,
    DateMaskDirective,
    PlacaMaskDirective,
    CEPMaskDirective,
    CityStateMaskDirective,
    OnlynumberMaskDirective,
    OnlyletterMaskDirective,
    CapitalizeMaskDirective,
    UppercaseMaskDirective
  ],
  providers: [
    UtilityService
  ]
})
export class MascarasModule { }
