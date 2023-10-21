// @ts-ignore

import {CommonModule} from '@angular/common';
import {Component, NgModule} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ValidationCallbackData} from 'devextreme/ui/validation_rules';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {AuthService} from '../../services';
import {DxFileUploaderModule, DxProgressBarModule, DxTextBoxModule} from "devextreme-angular";
import {UserModels} from "../../../models/user.model";
import {FormsModule} from "@angular/forms";
import {DxoTextModule} from "devextreme-angular/ui/nested";


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;

  formData: any = {};

  labelIgualFlow: string;

  //Imagem
  isDropZoneActive = false;

  imageSource: any;

  textVisible = true;

  progressVisible = false;

  progressValue = 0;

  passMode: string;

  user: UserModels;

  constructor(private authService: AuthService, private router: Router) {
    this.onDropZoneEnter = this.onDropZoneEnter.bind(this);
    this.onDropZoneLeave = this.onDropZoneLeave.bind(this);
    this.onUploaded = this.onUploaded.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onUploadStarted = this.onUploadStarted.bind(this);
    this.labelIgualFlow = 'floating';
    this.passMode = 'password';
  }
/*
  id: number = +1;
  image: any = '';
  name: string = '';
  setor: string = '';
  email: string = '';
  login: string = '';
  senha: string = '';

  user: UserModels = {
    id: this.id,
    image: this.image,
    name: this.name,
    setor: this.setor,
    email: this.email,
    login: this.login,
    senha: this.senha
  };*/


  onDropZoneEnter(e) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      this.isDropZoneActive = true;
    }
  }

  onDropZoneLeave(e) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      this.isDropZoneActive = false;
    }
  }

  onUploaded(e) {
    const file = e.file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.isDropZoneActive = false;
      this.imageSource = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
    this.textVisible = false;
    this.progressVisible = false;
    this.progressValue = 0;
  }

  onProgress(e) {
    this.progressValue = e.bytesLoaded / e.bytesTotal * 100;
  }

  onUploadStarted(e: any) {
    this.imageSource = '';
    this.progressVisible = true;
  }

//Imagem

  passwordTextBoxOptions = {
    mode: 'password'
  }

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

  /*
  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.user.senha;
  }*/

  senha1: string;

  confirmPassword(senha2 = this.user.senha) {
    let confirm: boolean = false;
    if (this.senha1 === senha2) {
      return confirm = true;
    } else {
      return confirm = false;
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
    DxoTextModule
  ],
  declarations: [CreateAccountFormComponent],
  exports: [CreateAccountFormComponent]
})


export class CreateAccountFormModule {
}
