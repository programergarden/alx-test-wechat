import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserOrderDetailPage} from "./orderdetail";
import {AppGlobal, AppService} from "../../../app/app.service";

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class UserOrdersPage implements OnInit{
  listType: any = 'all';
  Orders: any =[];
  DataList: any = [];
  constructor(public navCtrl: NavController,public navParam: NavParams, public appService: AppService) {
  }

  ngOnInit() {
    let status = this.navParam.get('status');
    if(this.appService.getItem(AppGlobal.cache.orders))
      this.Orders = this.appService.getItem(AppGlobal.cache.orders);
    if(status) {
        if('all' != status) {
          this.listType = status;
          if(this.Orders){
              this.DataList = this.Orders.filter(item => item.repairOrderStatus )
          }
        }
    }
  }

  goToDetails(item: any){
      this.navCtrl.push(UserOrderDetailPage,{ data:item });
  }
}
