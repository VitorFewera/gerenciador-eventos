import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, CreateAccountFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { NewEventComponent } from './pages/new-event/new-event.component';
import {
    DxButtonModule,
    DxCheckBoxModule, DxDataGridModule, DxDateBoxModule,
    DxFormModule,
    DxNumberBoxModule,
    DxSelectBoxModule, DxTextBoxModule,
    DxTreeListModule
} from "devextreme-angular";
import { AdmEventComponent } from './pages/adm-event/adm-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NewEventComponent,
    AdmEventComponent
  ],
    imports: [
        BrowserModule,
        SideNavOuterToolbarModule,
        SideNavInnerToolbarModule,
        SingleCardModule,
        FooterModule,
        CreateAccountFormModule,
        LoginFormModule,
        UnauthenticatedContentModule,
        AppRoutingModule,
        DxSelectBoxModule,
        DxFormModule,
        DxNumberBoxModule,
        DxCheckBoxModule,
        DxButtonModule,
        DxTreeListModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        DxTextBoxModule,
        DxDateBoxModule,
        DxDataGridModule
    ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
