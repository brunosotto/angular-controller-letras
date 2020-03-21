import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpConnectorService } from './http-connector.service';

@Injectable()
export class UserInfoService {

  constructor(
    private readonly http: HttpConnectorService
  ) { }

  public getUserInfo(): Observable<UserInfo> {
    return this.http.get(environment.user.info);
  }

}

export class UserInfo {
  username: string;
}
