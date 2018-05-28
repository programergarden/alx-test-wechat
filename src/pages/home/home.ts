import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, NavParams, Slides } from 'ionic-angular';
import { CategoryPage } from "../category/category";
import { CategoriesService, Category} from "../../services/CategoriesService";
import { BaseServices } from "../../services/BaseServices";
import { MaintainPage } from "../maintain/maintain";
import {AppGlobal, AppService} from "../../app/app.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  @ViewChild(Slides) slides: Slides;
  hots: any;
  slideData: Category[];
  slideCols: number = 8;
  slideMore: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App,public categoryService: CategoriesService, public base: BaseServices, public appService: AppService) {
  }

  ngOnInit() {
      this.Auth2Login();
      /*this.base.WechatUserInfo();*/
      this.categoryService.getCategoryHots()
      this.categoryService.getCategories();

      if(this.appService.getItem(AppGlobal.cache.hots))
          this.hots = this.appService.getItem(AppGlobal.cache.hots);
      this.slideChange();
  }
  //转到维修页
  goToMaintain(ev: any) {
      this.appCtrl.getRootNav().push(MaintainPage,{ data: JSON.stringify(ev) });
  }
  //转到分类页
  goToCategory() {
      this.appCtrl.getRootNav().push(CategoryPage);
      /*this.navCtrl.push(CategoryPage);*/
  }

  Auth2Login(){

      let code = "081JaQMv1CVFRa0hcTNv1mLZMv1JaQMg";
        //this.navParams.get('code');
      if(code && code.trim()!= '') {
          let data = this.base.WeChatLogin(code);
          console.log(data);
      }
     /* else {
        this.appService.alert('未获取到用户信息');
      }*/
  }

  slideChange() {
     let index = this.slides.getActiveIndex() || 0;
     let result = []
     if(this.hots) {
        if(this.hots.length < this.slideCols) {
           result = this.hots;
        } else {
            for (let i = (index * this.slideCols); i < Math.min((index + 1) * this.slideCols,this.hots.length); i++) {
                result.push(this.hots[i]);
            }
        }
     }
     if(result.length>7)
       this.slideMore = true;

     this.slideData = result;
     if(index)
      this.slides.slideTo(index, 500);
  }

}
