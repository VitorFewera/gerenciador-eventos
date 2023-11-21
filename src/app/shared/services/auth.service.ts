import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ParticipantesModel} from "../../models/ParticipantesModel.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import DevExpress from "devextreme";
import {map} from 'rxjs/operators';

const defaultPath = '/login-form';
const defaultUser = {
  email: 'Adm',
};

@Injectable()
export class AuthService {

  private apiParticipantes: string = 'http://localhost:3001/participantes';

  user: ParticipantesModel = new ParticipantesModel();

  private _lastAuthenticatedPath: string = defaultPath;

  get loggedIn(): boolean {
    return this.retornoLog;
  }

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
    this.router.navigate([this._lastAuthenticatedPath]);
  }

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  retornoLog: any;

  logIn(login: string, password: string): Observable<{ passou: boolean }> {
    console.log(this.getUsuario(login, password));
    this.retornoLog = this.getUsuario(login, password).pipe(
      map(participantes => ({passou: participantes.length > 0}))
    );
    console.log('retornoLog: ', this.retornoLog)
    return this.retornoLog;
  }


  getUsuario(login: string, password: string): Observable<any> {
    console.log(login, password);
    console.log(`${this.apiParticipantes}?user=${login}&password=${password}`);
    return this.httpClient.get(`${this.apiParticipantes}?user=${login}&password=${password}`)
  }


  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this.user
      };
    } catch {
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
    } catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this.retornoLog = false;
    this.router.navigate(['/login-form']);
  }
}


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;

    const isAuthForm = [
      'login-form',
      'create-account',
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

