import { Component } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-louvor',
  templateUrl: './louvor.component.html',
  styleUrls: ['./louvor.component.scss']
})
export class LouvorComponent {

  public arr = [1];

  constructor(
    private service: ConfigService,
  ) {
  }

  public onSubmit(texto: string): void {
    // TODO: bloquear até receber de volta
    this.service.sendText(texto);
  }

  public addParagrafo(): void {
    this.arr.push(this.arr.length + 1);
  }

}
