import { NgModule, ErrorHandler, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from "@angular/common";
import localeCN from '@angular/common/locales/zh-Hans';
import localExtraCN from '@angular/common/locales/extra/zh-Hans';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from "@angular/forms";
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

registerLocaleData(localeCN,'zh-Hans',localExtraCN);

@NgModule({
  declarations: [
    MyApp,
    MaintainPage,
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
    IonicModule.forRoot(MyApp,{
        backButtonText: '返回',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MaintainPage,
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
    { provide: LOCALE_ID, useValue:'zh-Hans'}
  ]
})
export class AppModule {
}
