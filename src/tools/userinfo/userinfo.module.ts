import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { UserInfoAddressPage } from "./address/address";
import { CitiesService } from "../../services/citiesService";
import {IonicModule} from "ionic-angular";
import {UserinfoComponent} from "./userinfo.component";

@NgModule({
  declarations: [
      UserInfoAddressPage,
      UserinfoComponent
  ],
  imports: [
    IonicModule.forRoot(UserinfoComponent)
  ],
  entryComponents: [
    UserInfoAddressPage,
    UserinfoComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    CitiesService
  ],
  exports:[
  ]
})

export class UserinfoModule {
}
