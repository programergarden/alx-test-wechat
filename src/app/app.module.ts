import { NgModule, ErrorHandler, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicPageModule, IonicModule, IonicErrorHandler, IonicApp } from 'ionic-angular';
import { FormsModule } from "@angular/forms";
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { registerLocaleData } from "@angular/common";
import localeZhCN from "@angular/common/locales/zh-Hans";
import localeZhCNExtra from "@angular/common/locales/extra/zh-Hans";

import { PayPage } from "../pages/pay/pay";
import { ConfirmPage } from "../pages/confirm/confirm";
import { CommonPage } from "../pages/common/common";
import { MaintainPage } from '../pages/maintain/maintain';
import { CategoryPage } from "../pages/category/category";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AlxListView } from "../until/listview/listview";
import { CategoriesService } from "../services/CategoriesService";
import { UserinfoModule} from "../tools/userinfo/userinfo.module";
import { HttpClientModule } from "@angular/common/http";
import { BaseServices } from "../services/BaseServices";
import { OrdersService } from "../services/OrdersService";
import { AppGlobal, AppService } from "./app.service";
import { AutosizetextareaDirective } from "../until/autosizetextarea/autosizetextarea";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


registerLocaleData(localeZhCN, 'zh_Hans', localeZhCNExtra);

@NgModule({
  declarations: [
      MyApp,
      MaintainPage,
      PayPage,
      ConfirmPage,
      CommonPage,
      CategoryPage,
      HomePage,
      TabsPage,
      AlxListView,
      AutosizetextareaDirective
  ],
  imports: [
      BrowserModule,
      FormsModule,
      UserinfoModule,
      HttpClientModule,
      BrowserAnimationsModule,
      IonicModule.forRoot(MyApp,{
          backButtonText: '返回',
      }),
      IonicPageModule.forChild(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      MaintainPage,
      PayPage,
      ConfirmPage,
      CommonPage,
      CategoryPage,
      HomePage,
      TabsPage,
      AlxListView
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
      StatusBar,
      SplashScreen,
      CategoriesService,
      BaseServices,
      OrdersService,
      AppService,
      AppGlobal,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      { provide: LOCALE_ID, useValue:'zh_Hans' }
  ]
})
export class AppModule {

}
