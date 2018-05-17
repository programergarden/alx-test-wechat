import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from "../category/category";
import { CategoriesService } from "../../services/CategoriesService";
import { BaseServices } from "../../services/BaseServices";
import { MessageServices } from "../../services/MessageServices";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  Categories: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public msg: MessageServices, public categoryService: CategoriesService, public base: BaseServices) {
  }

  ngOnInit() {
    this.Categories = this.categoryService.getCategories();
    this.Auth2Login();
  }
  goToMaintain() {

  }

  goToCategory() {
    this.navCtrl.push(CategoryPage);
  }

  Auth2Login(){
      let code = this.navParams.get('code');
      if(code && code.trim()!= '') {
          this.base.WeChatLogin(code).subscribe(item => {
            console.log(item);
          }, error => {
            console.log(error);
          });
      }
      else {
        this.msg.alert('error','未获取到用户信息');
      }
  }
}
