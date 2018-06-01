import { Component, OnInit } from "@angular/core";
import { UserOrdersPage } from "./orders/orders";
import { AppGlobal, AppService } from "../../app/app.service";
import { UserProfilePage } from "./profile/userprofile";

@Component({
  selector: 'userinfo-page',
  templateUrl: 'userinfo.component.html'
})

export class UserComponent implements OnInit{
  user: any;
  gender: string;
  genderColor: string;

  constructor(public appService: AppService){}

  ngOnInit(){
      this.user = this.appService.getItem(AppGlobal.cache.userInfo);
      this.gender = 0? "male":"female";
      this.genderColor = 0? "#5599FF":"#C10066";
  }

  goToOrders(type: string){
      this.appService.router(UserOrdersPage,{status:type});
  }

  goToService() {
      this.appService.alert('暂时不支持线上退单');
  }

  goToSetting(){
      this.appService.router(UserProfilePage,{data:this.user});
  }
}
