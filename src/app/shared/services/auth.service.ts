import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {ParticipantesModel} from "../../models/ParticipantesModel.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import DevExpress from "devextreme";
import { map } from 'rxjs/operators';

const defaultPath = '/';
const defaultUser = {
  email: 'Adm',
};

@Injectable()
export class AuthService {

  private apiParticipantes: string = 'http://localhost:3001/participantes';

  user: ParticipantesModel = new ParticipantesModel();

  get loggedIn(): boolean {
    return !!this.user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  //this.router.navigate([this._lastAuthenticatedPath]);
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private httpClient: HttpClient) { }

  logIn(login: string, password: string): Observable<{ passou: boolean }> {
    console.log(login, password);
    console.log(`${this.apiParticipantes}?user=${login}&password=${password}`);
    return this.httpClient
      .get<any[]>(`${this.apiParticipantes}?user=${login}&password=${password}`)
      .pipe(
        map(participantes => ({ passou: participantes.length > 0 }))
      );
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this.user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this.user = null;
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
