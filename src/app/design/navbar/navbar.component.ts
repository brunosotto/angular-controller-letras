import { Component, OnInit } from '@angular/core';
import { UserInfoService, UserInfo } from 'src/app/security/user-info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private _userInfo: UserInfo;

  constructor(
    private readonly user: UserInfoService
  ) { }

  public ngOnInit(): void {
    // init
    this.user.getUserInfo().subscribe(u => {
      this._userInfo = u;
    });
  }

  public get userInfo(): UserInfo {
    return this._userInfo;
  }

}
