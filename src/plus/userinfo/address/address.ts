import { Component } from "@angular/core";
import { NavController, ViewController } from "ionic-angular";
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
            province: { code:this.order.provinceString },
            city: { code:this.order.cityString },
            district:{ code:this.order.areaString }
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
        if(!this.order.customerPhone) {
          this.appService.alert('请输入联系电话');
          return;
        } else {
          const exp = /((^0?1)\\d{10}$)|(^((0((((10)|(2\\d?))\\-?(\\d{8})|([3-9]\\d{2})\\-?(\\d{7})))|(\\d{7,8})))(\\-\\d{1,5})?$)/g;
          if(!exp.exec(this.order.customerPhone)) {
            this.appService.alert('联系电话格式不正确');
            return;
          }
        }
        if(this.cities.province.code) {
          this.order.provinceString = this.cities.province.code;
          if(this.cities.city.code) {
            this.order.cityString = this.cities.city.code;
          }
          if(this.cities.district.code) {
            this.order.areaString = this.cities.district.code;
          }
        } else {
            this.appService.alert('请选择所在城市');
            return;
        }

        if(!this.order.address) {
          this.appService.alert('请输入街道、乡镇信息');
          return;
        }
        if(!this.order.addressDetail) {
            this.appService.alert('请填写详细地址');
            return;
        }
        this.viewCtrl.dismiss(this.order);
    }
}
