import {CommonModule} from '@angular/common';
import {Component, NgModule} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import {
  DxButtonModule,
  DxFileUploaderModule,
  DxProgressBarModule,
  DxSelectBoxModule,
  DxTextBoxModule
} from "devextreme-angular";
import {FormsModule} from "@angular/forms";
import {DxoTextModule} from "devextreme-angular/ui/nested";
import {ParticipantesModel} from "../../../models/ParticipantesModel.model";
import {NewEventServiceAPI} from "../../services/new-event.service";


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  user: ParticipantesModel = new ParticipantesModel();

  loading = false;

  formData: any = {};

  labelFloating: string;

  textVisible = true;

  passMode: string;

  confirmarSenha: string;

  setores = [
    {id: 1, name: 'SIA'},
    {id: 2, name: 'SCPI'},
    {id: 3, name: 'SIP'},
    {id: 4, name: 'SIE e agregados'},
    {id: 5, name: 'Juridico'},
    {id: 6, name: 'Administrativo'},
    {id: 7, name: 'Limpeza'},
    {id: 8, name: 'Convidado'},
  ]

  constructor(private router: Router, private service: NewEventServiceAPI) {
     this.labelFloating = 'floating';
    this.passMode = 'password';
  }


  passwordTextBoxOptions = {
    mode: 'password'
  }

  /* estudar depois
  async onSubmit(e: Event) {
    console.log(this.user);
    e.preventDefault();

    this.user = this.formData;
    console.log(this.user, this.formData);
    this.loading = true;

    const result = await this.authService.createAccount(this.user.id, this.user.senha, this.user.login, this.user.nome, this.user.setor, this.user.email, this.user.image);
    console.log(result, this.user, this.formData);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/login-form']);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.user.senha;
  }*/

  cadastrarParticipante(participante: ParticipantesModel){
    console.log(participante);
    this.service.adicionarParticipante(participante).subscribe(
      () =>  console.log(participante) );
    this.router.navigate(['/login-form'])
  }

  confirmPassword(): boolean{
      if (this.user.password === this.confirmarSenha){
        return true
      }else{
        return false;
      }
  }

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxProgressBarModule,
    DxFileUploaderModule,
    FormsModule,
    DxTextBoxModule,
    DxoTextModule,
    DxSelectBoxModule,
    DxButtonModule
  ],
  declarations: [CreateAccountFormComponent],
  exports: [CreateAccountFormComponent]
})


export class CreateAccountFormModule {
}
