import {CommonModule} from '@angular/common';
import {Component, NgModule, ViewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import {
  DxButtonModule,
  DxFileUploaderModule, DxFormComponent,
  DxProgressBarModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorComponent
} from "devextreme-angular";
import {FormsModule} from "@angular/forms";
import {DxoTextModule} from "devextreme-angular/ui/nested";
import {ParticipantesModel} from "../../../models/ParticipantesModel.model";
import {NewEventServiceAPI} from "../../services/new-event.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  user: ParticipantesModel = new ParticipantesModel();

  loading = false;

  formData = {};

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

  @ViewChild(DxFormComponent, {static: false}) myform: DxFormComponent;

  cadastrarParticipante(participante: ParticipantesModel){
    if (!this.myform.instance.validate().isValid) {
      return
    }
    console.log(participante);
    this.service.adicionarParticipante(participante).subscribe(
      () =>  console.log(participante) );

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
      icon: "success",
      title: "Usuario cadastrado!"
    });

    this.router.navigate(['/login-form'])
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
