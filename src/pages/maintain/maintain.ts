import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AutosizetextareaDirective } from "../../until/autosizetextarea/autosizetextarea";
/*import { UserAddressPage } from "../../plus/userinfo/address/address";*/
import { Order, OrdersService } from "../../services/OrdersService";
import { AppGlobal, AppService, /*ToastPosition*/} from "../../app/app.service";
import { CategoryPage } from "../category/category";
import { UserOrdersPage } from "../../plus/userinfo/orders/orders";
import { PayPage } from "../pay/pay";
import { ConfirmPage } from "../confirm/confirm";

@Component({
  selector: 'page-maintain',
  templateUrl: 'maintain.html',
  providers: [AutosizetextareaDirective]
})
export class MaintainPage implements OnInit{
  order: Order = new Order();
  contentCount: number = 0;
  categories: any;
  dataItem: any;
  serviceItem: any;
  parentName: string;
  months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  minDate: string;
  maxDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public orders: OrdersService) {
      try {
          this.dataItem = JSON.parse(this.navParams.get("data"));
      } catch (e) {
          this.appService.toast(e);
      }
      let date = new Date().getTime();
      this.minDate = new Date(date + (3 * 3600000)).toISOString();
      this.maxDate = new Date(date + (7 * 24 * 3600000)).toISOString();
  }

  ngOnInit(){
      if(this.appService.getItem(AppGlobal.cache.hots) && this.dataItem) {
          this.categories = this.appService.getItem(AppGlobal.cache.hots);
          if(this.categories) {
              /*let parent = this.categories.filter(item => {
                 return item.serviceCode === this.dataItem.parentService;
             });
            if (parent) {
               this.parentName = parent[0].serviceName;
             }*/
              this.serviceItem = this.categories.filter(item => {
                return (item.parentService === this.dataItem.serviceCode && item.serviceLevel === 3);
              });
          }
          this.order.serviceCodeL1 = this.dataItem.parentService;
          this.order.serviceCodeL2 = this.dataItem.serviceCode;
      }
  }

  /*compareFn(val: string, ckVal: string): boolean {
    return val && ckVal? val === ckVal: ''=== ckVal;
  }*/

  getContentCount(count: number) {
      this.contentCount = count;
  }

  //转到分类页
  goToCategory() {
    this.appService.router(CategoryPage);
  }

  goToNext() {
     /* if(!this.order.serviceCodeL3 || this.order.serviceCodeL3.trim()==='') {
          this.appService.toast('请选择维修内容',ToastPosition.top);
          return;
      }
      if(!this.order.appointmentTimeStart || this.order.appointmentTimeStart.trim()==='') {
          this.appService.toast('请选择报修时间',ToastPosition.top);
          return;
      }
      if(!this.order.addressDetail || this.order.addressDetail.trim() === '') {
          this.appService.alert('未检测到用户的报修地址',()=> {
            let addressModal = this.modalCtrl.create(UserAddressPage,{ data: this.order },{ showBackdrop:false });
            addressModal.onDidDismiss( data => {
                this.appService.setItem(AppGlobal.API.order,this.order);
                this.orders.addOrder(data);
            });
            addressModal.present();
          });
      }*/
      this.appService.confirm('此单报修需要支付29元上门费',[{
          text: '放弃',
          role: 'cancel',
          handler: ()=> {
            this.appService.router(UserOrdersPage);
          }
      },{
          text: '前往支付',
          handler: ()=> {
              this.appService.modal(PayPage,{data:this.appService.productInfo},{ showBackdrop:false },data => {
                  if('-1'=== data) {
                    this.appService.router(UserOrdersPage,{status:'-1'});
                  } else  {
                    this.appService.modal(ConfirmPage,null,{ showBackdrop:false },data => {

                    });
                  }
              });
          }
      }]);
  }
}
