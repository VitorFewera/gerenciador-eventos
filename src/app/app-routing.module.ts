import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginFormComponent, CreateAccountFormComponent} from './shared/components';
import {AuthGuardService} from './shared/services';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxPopupModule, DxScrollViewModule, DxSelectBoxModule,
    DxTextAreaModule,
    DxTextBoxModule
} from 'devextreme-angular';
import {NewEventComponent} from "./pages/new-event/new-event.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AdmEventComponent} from "./pages/adm-event/adm-event.component";
import {MatTabsModule} from "@angular/material/tabs";

const routes: Routes = [

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-event',
    component: NewEventComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'adm-event',
    component: AdmEventComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule, DxButtonModule, FormsModule, CommonModule, DxPopupModule, MatTabsModule, DxTextAreaModule, DxTextBoxModule, DxSelectBoxModule, DxScrollViewModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,

  ]
})
export class AppRoutingModule {
}
