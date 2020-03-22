import { Component } from '@angular/core';
import { Config } from 'src/app/config/config.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private _config: Config;

  constructor(
  ) { }

  public get config(): Config {
    return this._config;
  }

}
