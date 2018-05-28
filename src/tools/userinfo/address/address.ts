import { Component } from "@angular/core";
import {NavController, ViewController} from "ionic-angular";
import { Order } from "../../../services/OrdersService";
import { AppService } from "../../../app/app.service";

@Component({
  selector: 'userinfo-address',
  templateUrl : 'address.html'
})

export class UserAddressPage {
    order: Order;
    cities: any;

    constructor(public navCtrl :NavController, public viewCtrl: ViewController, public appService: AppService){
        this.order = this.viewCtrl.getNavParams().get("data");
        this.cities = {
            province: { code:this.order.addressProvince },
            city: { code:this.order.addressCity },
            district:{ code:this.order.addressDistrict }
        }
        if(!this.order.customerType) {
            this.order.customerType = 1;
        }
    }

    cityChange(val: string) {
        this.cities = val;
    }

    dismiss(){
        if(!this.order.displayName) {
            this.appService.alert('请输入联系人');
            return;
        }
        if(!this.order.customerType) {
            this.appService.alert('请选择性别');
            return;
        }
        if(this.cities.province.code) {
          this.order.addressProvince = this.cities.province.name;
        } else {
            this.appService.alert('请选择所在城市');
            return;
        }
        if(this.cities.city.code) {
          this.order.addressCity = this.cities.city.name;
        }
        if(this.cities.district.code) {
          this.order.addressDistrict = this.cities.district.name;
        }
        if(!this.order.addressDetail) {
            this.appService.alert('请填写详细地址');
            return;
        }
        this.viewCtrl.dismiss(this.order);
    }
}
