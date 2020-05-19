import { Component, HostListener } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss']
})
export class TextoComponent {

  public texto: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'Escape') {
      this.limpar();
    }

    if (event.key === 'ArrowRight') {
      this.reEmitir();
    }
  }

  constructor(
    private service: ConfigService,
  ) {
  }

  private limpar(): void {
    this.service.sendText(' ');
  }

  private reEmitir(): void {
    this.onSubmit();
  }

  public onSubmit(): void {
    // TODO: bloquear até receber de volta
    this.service.sendText(this.texto);
  }

}
