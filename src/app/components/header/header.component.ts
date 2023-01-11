import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/security/auth.service";
import {Observable} from "rxjs";
import {AppUserService} from "../../services/app-user-authentification/app-user.service";
import {SessionStorageService} from "../../services/security/session-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nickname: string = 'Profil';
  title = 'PlanCrazyAppAngular';
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn;

  constructor(private authService: AuthService,
              private appUserService: AppUserService,
              private sessionStorageService: SessionStorageService) {
  }

  ngOnInit(): void {
    this.updateNickname();
  }

  onLogout() {
    this.authService.logout();
  }

  private updateNickname() {
    if (this.sessionStorageService.getToken()) {
      this.appUserService.get().subscribe({
        next: value => {
          this.nickname = value['nickname']
        },
        error: err => {
          console.log(err)
        }
      });
    }
  }

}
