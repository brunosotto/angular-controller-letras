import { Component } from '@angular/core';
import { Config, ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private _config: Config;

  constructor(
    private readonly service: ConfigService,
  ) { }

  public get config(): Config {
    return this._config;
  }

  public limpar(): void {
    // TODO: bloquear até receber de volta
    this.service.sendText(' ');
  }

}
