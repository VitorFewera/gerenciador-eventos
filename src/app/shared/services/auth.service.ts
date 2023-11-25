import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ParticipantesModel } from '../../models/ParticipantesModel.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import DevExpress from 'devextreme';
import { map } from 'rxjs/operators';
import { ParticipantesEventsModel } from 'src/app/models/participantes.model';

const defaultPath = '/';

@Injectable()
export class AuthService {
  private apiParticipantes: string = 'http://localhost:3001/participantes';

  get loggedIn(): boolean {


    return this.retornoLog;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private httpClient: HttpClient) {}

  retornoLog: any;

  logIn(login: string, password: string): Observable<{ passou: boolean }> {
    console.log(this.getUsuario(login, password));
    return this.retornoLog = this.getUsuario(login, password).pipe(
      map((participantes) => ({ passou: participantes.length > 0 }))
    );
  }

  getUsuario(login: string, password: string): Observable<any> {
    console.log(login, password);
    console.log(`${this.apiParticipantes}?user=${login}&password=${password}`);
    return this.httpClient.get(
      `${this.apiParticipantes}?user=${login}&password=${password}`
    );
  }



  async logOut() {
   this.retornoLog = null;
    this.router.navigate(['/login-form']);
  }

}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'create-account',

    ].includes(route.routeConfig.path);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      console.log('passou aqui 1');
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      console.log('pasou aqui 2', isLoggedIn, isAuthForm);//////

      this.router.navigate(['/login-form']);
      return false;
    }

    if (isLoggedIn) {
      console.log('passou aqui 3');

     this.authService.lastAuthenticatedPath = route.routeConfig.path;
     console.log('ele tras isso ',this.authService.lastAuthenticatedPath);

    }

    console.log('o metodo authGuardian retorna: ', isLoggedIn || isAuthForm);

    return isLoggedIn || isAuthForm;
  }}

