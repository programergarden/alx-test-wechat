import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserOrderDetailPage } from "./orderdetail";
import { AppService } from "../../../app/app.service";
import { OrdersService } from "../../../services/OrdersService";

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class UserOrdersPage{
  listType: any = '0';
  DataList: any = [];
  hasMore = true;
  params = {
      pageNum:0,
      pageSize:10
  };
  constructor(public navCtrl: NavController,public navParam: NavParams, public appService: AppService, public orderService: OrdersService) {
    let status = this.navParam.get('status');
    if(status) {
      this.listType = status;
    }
  }


  goToDetails(item: any){
      this.navCtrl.push(UserOrderDetailPage,{ data:item });
  }

  doInfinite(infiniteScroll) {
      if(false == this.hasMore){
          infiniteScroll.complete();
          return;
      }
      else {
         if('0' !== this.listType){
           this.params["wechatStatus"] = this.listType;
         }
         else {
            this.DataList = this.orderService.getOrders(this.params);
         }
         if(this.DataList) {
            this.params.pageNum += 1;
         }else {
           this.hasMore = false;
         }
      }
  }
}
