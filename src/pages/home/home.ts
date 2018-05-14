import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { MaintainPage } from "../maintain/maintain";
import { CategoryPage } from "../category/category";
import { CategoriesService } from "../../services/CategoriesService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  Categories: any;
  constructor(public navCtrl: NavController, public appCtrl: App, public categoryService: CategoriesService) {

  }

  goToMaintain() {
    this.appCtrl.getRootNav().push(MaintainPage);
  }

  goToCategory() {
    this.navCtrl.push(CategoryPage);
  }

  ngOnInit() {
    this.Categories = this.categoryService.getCategories();
  }

}
