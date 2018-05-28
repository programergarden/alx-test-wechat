import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams} from 'ionic-angular';
import { AutosizetextareaDirective } from "../../until/autosizetextarea/autosizetextarea";
import { UserAddressPage } from "../../tools/userinfo/address/address";
import {Order, OrdersService} from "../../services/OrdersService";
import { AppGlobal, AppService } from "../../app/app.service";


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
  minDate: string;
  maxDate: string;

  constructor(public navParams: NavParams, public appService: AppService, public modalCtrl: ModalController, public orders: OrdersService) {
      let date = Date.parse(new Date().toString());
      this.minDate = this.formatDate(new Date(date + (3 * 3600000)),'yyyy-MM-ddThh:mm');
      this.maxDate = this.formatDate(new Date(date + (7 * 24 * 3600000)),'yyyy-MM-ddThh:mm');
      console.log('min:'+this.minDate+',max:'+this.maxDate);
  }

  ngOnInit(){
      this.dataItem = this.navParams.get("data");

      if(this.appService.getItem(AppGlobal.cache.hots) && this.dataItem) {
          this.categories = this.appService.getItem(AppGlobal.cache.hots);
          if(this.categories) {
           /* let parent = this.categories.filter(item => {
              return item.serviceCode === this.dataItem.parentService;
            });
            if (parent) {
              this.parentName = parent[0].name;
            }
            this.serviceItem = this.categories.filter(item => {
              return (item.parentService === this.dataItem.serviceCode && item.serviceLevel === 3);
            });*/
          }
        /*  this.order.serviceCodeL1 = this.dataItem.parentService;
          this.order.serviceCodeL2 = this.dataItem.serviceCode;*/
      }
  }

  /*compareFn(val: string, ckVal: string): boolean {
    return val && ckVal? val === ckVal: ''=== ckVal;
  }*/

  getContentCount(count: number) {
    this.contentCount = count;
  }

  goToNext() {
      if(!this.order.description){
          this.appService.alert('请输入保修问题');
          return;
      }
      if(!this.order.addressDetail || this.order.addressDetail.trim() === '') {
          this.appService.alert('未检测到用户的报修地址',()=> {
            let addressModal = this.modalCtrl.create(UserAddressPage,{ data: this.order },{ showBackdrop:false });
            addressModal.onDidDismiss( data => {
                this.orders.addOrder(data);
            });
            addressModal.present();
          });
      }

  }

  formatDate(date,format?: string) :string {
    date = date || (new Date());
    format = format || "yyyy-MM-dd HH:mm:ss";
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    }

    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
  }
}
