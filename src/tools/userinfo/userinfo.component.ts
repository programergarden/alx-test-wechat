import {Component, OnInit} from "@angular/core";
import {App, NavController} from 'ionic-angular';
import {UserOrdersPage} from "./orders/orders";
import {AppGlobal, AppService} from "../../app/app.service";
import {UserProfilePage} from "./profile/userprofile";

@Component({
  selector: 'userinfo-page',
  templateUrl: 'userinfo.component.html'
})

export class UserComponent implements OnInit{
  user: any;
  gender: string;
  genderColor: string;

  constructor(public navCtrl: NavController, public appCtrl: App, public appService: AppService){}

  ngOnInit(){
      this.user = this.appService.getItem(AppGlobal.cache.userInfo);
      this.gender = 0? "male":"female";
      this.genderColor = 0? "#5599FF":"#C10066";
  }

  goToOrders(type: string){
      this.appCtrl.getRootNav().push(UserOrdersPage,{status:type});
  }

  goToService() {
      this.appService.alert('暂时不支持线上退单');
  }

  goToSetting(){
      this.appCtrl.getRootNav().push(UserProfilePage,{data:this.user});
  }

  callMe() {
      window.location.href = "tel://4008594110";
  }
}
