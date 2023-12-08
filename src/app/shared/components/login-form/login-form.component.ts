import {CommonModule} from '@angular/common';
import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {AuthService} from '../../services';
import {FormsModule} from '@angular/forms';
import {ParticipantesModel} from '../../../models/ParticipantesModel.model';
import {DxTextBoxModule} from 'devextreme-angular';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  user: ParticipantesModel = new ParticipantesModel();
  loading = false;
  formData: any = {};
  labelMode: string;

  constructor(private authService: AuthService, private router: Router) {
    this.labelMode = 'floating';
  }

  logIn() {
    this.authService.logIn(this.user.user, this.user.password).subscribe(
      (retorno) => {
        if (retorno.passou) {
          this.router.navigate(['/home']);
        } else {
          this.authService.retornoLog = null;

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Erro ao realizar o login"
          });

        }
      },
      (error) => {
        console.error('Erro ao realizar login', error);
      }
    );
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  };
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    FormsModule,
    DxTextBoxModule,
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule {
}
