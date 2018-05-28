import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { UserComponent } from "./userinfo.component";
import { UserOrdersPage } from "./orders/orders";
import { UserOrderDetailPage } from "./orders/orderdetail";
import { UserAddressList } from "./address/addresslist";
import { UserAddressPage } from "./address/address";
import { AlxAddressPickerComponent } from "../../until/alxaddresspicker/alxaddresspicker.component";

import { CitiesService } from "../../services/citiesService";
import { UserProfilePage } from "./profile/userprofile";

@NgModule({
  declarations: [
      UserProfilePage,
      UserOrdersPage,
      UserOrderDetailPage,
      UserAddressList,
      UserAddressPage,
      UserComponent,
      AlxAddressPickerComponent
  ],
  imports: [
      IonicModule.forRoot(UserComponent)
  ],
  entryComponents: [
      UserProfilePage,
      UserOrdersPage,
      UserOrderDetailPage,
      UserAddressList,
      UserAddressPage,
      UserComponent,
      AlxAddressPickerComponent
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
      CitiesService
  ],
  exports:[
      AlxAddressPickerComponent
  ]
})

export class UserinfoModule {
}
