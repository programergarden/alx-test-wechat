import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AppService } from "../../../app/app.service";
import { PayPage } from "../../../pages/pay/pay";
import { ConfirmPage } from "../../../pages/confirm/confirm";
import { UserOrdersPage } from "./orders";
import { OrdersService } from "../../../services/OrdersService";

@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html'
})

export class UserOrderDetailPage implements OnInit{
  dataItem: any;
  tips: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public appService: AppService,public orderService: OrdersService){
  }

  ngOnInit() {
      this.tips = '提示：已付款的订单请联系客服取消/退款';
      if(this.navParams.get('data')) {
          this.dataItem = this.navParams.get('data');
      }
  }

  delete() {
     this.orderService.closeOrder(this.dataItem.repairOrderId);
  }

  pay() {
    this.appService.modal(PayPage,{data:this.appService.productInfo},{ showBackdrop:false },data => {
      if('nopay'=== data) {
        this.appService.router(UserOrdersPage,{status:'nopay'});
      } else  {
        this.appService.modal(ConfirmPage,null,{ showBackdrop:false },data => {

        });
      }
    });
  }
}
