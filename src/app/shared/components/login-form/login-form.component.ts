import {CommonModule} from '@angular/common';
import {Component, NgModule} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {AuthService} from '../../services';
import {FormsModule} from "@angular/forms";
import {ParticipantesModel} from "../../../models/ParticipantesModel.model";
import {DxTextBoxModule} from "devextreme-angular";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  user: ParticipantesModel = new ParticipantesModel();
  loading = false;
  formData: any = {};
  labelMode: string;

  constructor(private authService: AuthService, private router: Router) {
    this.labelMode = 'floating';
  }

  log: any;

  logIn() {
    this.log = this.authService.logIn(this.user.user, this.user.password).subscribe(
      (retorno) => console.log(retorno.passou));
      //error => console.log(error)
    //() => { return this.navegarUsuario()});
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }

  /*
  navegarUsuario(){
     console.log(this.log)
    if (this.log !== true){
      this.router.navigate(['/home']);
    }else{
      alert('deu ruim')
    }
  }*/

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    FormsModule,
    DxTextBoxModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule {
}
