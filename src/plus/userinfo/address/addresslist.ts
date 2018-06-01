import {Component} from "@angular/core";
import {UserAddressPage} from "./address";
import {AppService} from "../../../app/app.service";

@Component({
  selector: 'page-address-list',
  templateUrl: 'addresslist.html'
})
export class UserAddressList {
  constructor(public appService: AppService){}

  goToAddress(id: number) {
      this.appService.router(UserAddressPage,{data:id});
  }
}


