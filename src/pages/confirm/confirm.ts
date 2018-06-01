import { Component } from "@angular/core";
import { UserOrderDetailPage } from "../../plus/userinfo/orders/orderdetail";
import {AppGlobal, AppService} from "../../app/app.service";

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})

export class ConfirmPage {
  order: any;
  payStatus: any;

  constructor(public appService: AppService) {
      if(this.appService.getItem(AppGlobal.API.order)){
          this.order = this.appService.getItem(AppGlobal.API.order);
      }
  }


  showOrder(){
      this.appService.router(UserOrderDetailPage,{data:this.order});
  }
}
