import {Component} from "@angular/core";
import {App, NavController} from "ionic-angular";
import {UserAddressPage} from "./address";

@Component({
  selector: 'page-address-list',
  templateUrl: 'addresslist.html'
})
export class UserAddressList {
  constructor(public navCtrl: NavController, public appCtrl: App){}

  goToAddress(id: number) {
    this.appCtrl.getRootNav().push(UserAddressPage,{data:id});
  }
}


