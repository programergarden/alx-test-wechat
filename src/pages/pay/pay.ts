import { Component } from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import { AppService } from "../../app/app.service";
import { UserOrdersPage } from "../../tools/userinfo/orders/orders";
import {CommonPage} from "../common/common";

@Component({
    selector: 'page-pay',
    templateUrl: 'pay.html'
})

export class PayPage {
    price: number = 2900;
    constructor(public navCtrl: NavController, public appService: AppService,public viewCtrl: ViewController, public navParams: NavParams){
    }

    wechatPay(){
      this.viewCtrl.dismiss('pay_finished');
    }

    cancel(){
        this.appService.confirm('你确定要放弃此订单的支付',[
            {
                text:'取消',
                role: 'cancel',
                handler: ()=> {
                  console.log('no');
                }
            },{
                text:'确定',
                handler: ()=> {
                  this.viewCtrl.dismiss('-1');
                }
            }
        ])
    }

    showDescription() {
        this.appService.modal(CommonPage,null);
    }

    showOrders(){
        this.navCtrl.push(UserOrdersPage);
    }
}
