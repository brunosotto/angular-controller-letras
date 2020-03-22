import { Component } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss']
})
export class TextoComponent {

  public texto: string;

  constructor(
    private service: ConfigService,
  ) {
  }

  public onSubmit(): void {
    // TODO: bloquear até receber de volta
    this.service.sendText(this.texto);
  }

}
