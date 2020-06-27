import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit {

  public config$: Observable<Config>;


  constructor(
    private service: ConfigService,
  ) {
    this.config$ = this.service.config$;
  }

  ngOnInit() {
  }

  public onSubmit(config: Config): void {
    // TODO: bloquear até receber de volta
    this.service.setConfigs(config.top, config.size, config.pad);
  }

}
