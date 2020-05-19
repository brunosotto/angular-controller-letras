import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Config, ConfigService } from 'src/app/config/config.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private _config: Config;

  @Output() private readonly limpou: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public set title(text: string) {
    this.titleService.setTitle(text);
  }

  constructor(
    private readonly service: ConfigService,
    private titleService: Title
  ) { }

  public get config(): Config {
    return this._config;
  }

  public limpar(): void {
    // TODO: bloquear até receber de volta
    this.service.sendText(' ');
    this.limpou.emit(true);
  }

}
