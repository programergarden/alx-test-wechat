import { NgModule, ErrorHandler, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from "@angular/common";
import localeCN from '@angular/common/locales/zh-Hans';
import localExtraCN from '@angular/common/locales/extra/zh-Hans';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from "@angular/forms";
import { MyApp } from './app.component';

import { MaintainPage } from '../pages/maintain/maintain';
import { ListPage } from '../pages/list/list';
import { CategoryPage } from "../pages/category/category";
import { MinePage } from '../pages/mine/mine';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AlxListView } from "../until/listview/listview";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CategoriesService} from "../services/CategoriesService";
import {AutosizetextareaDirective} from "../until/autosizetextarea/autosizetextarea";

registerLocaleData(localeCN,'zh-Hans',localExtraCN);

@NgModule({
  declarations: [
    MyApp,
    MaintainPage,
    ListPage,
    MinePage,
    CategoryPage,
    HomePage,
    TabsPage,
    AlxListView,
    AutosizetextareaDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MaintainPage,
    ListPage,
    MinePage,
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue:'zh-Hans'}
  ]
})
export class AppModule {
}
