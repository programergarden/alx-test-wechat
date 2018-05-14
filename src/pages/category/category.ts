import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriesService } from "../../services/CategoriesService";


@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage implements OnInit{
  searchData: any[];
  dataList: any;

  constructor(public navCtrl: NavController,  @Inject(forwardRef(()=>CategoriesService)) public categoriesService: CategoriesService) {
  }

  filterItem(ev: any) {
    let filterVal = ev.target.value;
    if(filterVal && filterVal.trim() !== '') {
      this.searchData = this.dataList.value.filter(item => {
        return (item.categoryName.indexOf(filterVal)>-1);
      })
    }else {
      this.searchData = null;
    }
  }

  doInfinite(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.searchData = this.searchData.concat(this.searchData);
        resolve();
      }, 500);
    })
  }

  ngOnInit() {
     this.dataList = this.categoriesService.getCategories();
  }
}
