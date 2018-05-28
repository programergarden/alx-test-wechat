import {Component, OnInit, ViewChild} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";
import {MaintainPage} from "../maintain/maintain";


@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage implements OnInit{
  @ViewChild('navbar') navbar;
  searchData: any[];
  dataList: any;

  constructor(public navCtrl: NavController,public appService: AppService, public appCtrl: App) {
  }

  filterItem(ev: any) {
    let filterVal = ev.target.value;
    if(filterVal && ''!== filterVal.trim() && this.dataList && this.dataList.length > 0 ) {
      this.searchData = this.dataList.filter(item => {
          return (item.serviceName.indexOf(filterVal)>-1);
      });
    }else if('' == filterVal || 'undefined' === typeof filterVal){
        this.searchData = null;
    } else {
        this.searchData = [];
    }
  }

  goToMaintain(ev: any) {
      this.appCtrl.getRootNav().push(MaintainPage,{ data: ev });
  }

  /*doInfinite(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.searchData = this.searchData.concat(this.searchData);
        resolve();
      }, 500);
    })
  }*/

  ngOnInit() {
      let data ;
      if(this.appService.getItem(AppGlobal.cache.categories))
        data = this.appService.getItem(AppGlobal.cache.categories);
      if(data)
        this.dataList = data.filter( item => {
          return item.serviceLevel === 2;
        });
  }
}
