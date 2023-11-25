import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  linkedin: string = 'https://www.linkedin.com/in/vitor-hugo-lopes-ferreira-524b0923a/';

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) { }


  isAuthenticated() {
   // console.log('chegou aqui', this.authService.loggedIn);

    return this.authService.loggedIn;
  }
}
